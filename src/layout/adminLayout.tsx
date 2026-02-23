import { useEffect, useMemo, useState } from "react";
import DynamicGrid from "../components/agGrid";
import Menubar from "../components/menubar";
import NavbarComponent from "../components/navbar";
import { menuAdminbar, type AdminModuleType } from "../config/menubar";
import { fetchAllTenants } from "../axios/tenant";
import { fetchAllHospital } from "../axios/hospital";
import { fetchAllDoctors } from "../axios/doctors";
import { fetchAllNurse } from "../axios/nurse";
import { fetchAllPharmacist } from "../axios/pharmacist";
import { fetchAllReceptionist } from "../axios/receptionist";
import { hasAccess } from "../config/permission";
import { fetchRoleByIdApi } from "../axios/rolesApi";
import ModuleFormModal from "../components/FormModal";

const Adminlayout = () => {
    const role = localStorage.getItem("roleName") || "SUPERADMIN";
    const menuBar = menuAdminbar[role] ?? [];

    const [selectedMenu, setSelectedMenu] = useState("");
    const [module, setModule] = useState<AdminModuleType>("tenant");
    const [rowData, setRowData] = useState<any[]>([]);
    const [roleDoc, setRoleDoc] = useState<any>(null);

    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create");
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const permissions = useMemo(() => ({
        canView: hasAccess(roleDoc, module, "view"),
        canCreate: hasAccess(roleDoc, module, "create"),
        canUpdate: hasAccess(roleDoc, module, "update"),
        canDelete: hasAccess(roleDoc, module, "delete"),
    }), [roleDoc, module]);

    const apiMap: Record<AdminModuleType, () => Promise<any>> = {
        tenant: fetchAllTenants,
        hospital: fetchAllHospital,
        doctor: fetchAllDoctors,
        nurse: fetchAllNurse,
        pharmacist: fetchAllPharmacist,
        receptionist: fetchAllReceptionist,
    };

    const fetchData = async (mod: AdminModuleType) => {
        const response = await apiMap[mod]();
        setRowData(response.data.data || []);
    };

    useEffect(() => {
        const roleCode = localStorage.getItem("roleCode");
        if (!roleCode) return;
        fetchRoleByIdApi(roleCode).then(res =>
            setRoleDoc(res.data.data)
        );
    }, []);

    useEffect(() => {
        if (menuBar.length > 0) {
            const first = menuBar[0];
            setSelectedMenu(first.title);
            setModule(first.module);
            fetchData(first.module);
        }
    }, [role]);

    const handleMenuClick = (title: string, mod: AdminModuleType) => {
        setSelectedMenu(title);
        setModule(mod);
        fetchData(mod);
    };

    return (
        <>
            <NavbarComponent />
            <div
                style={{
                    display: "flex",
                    height: "85px",
                    width: "100%",
                    backgroundColor: "#f8f9fa",
                    alignItems: "center",
                }}
            >

                <Menubar
                    menubar={menuBar}
                    onClick={handleMenuClick}
                    selectedMenu={selectedMenu}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                    marginRight: "15px",
                }}
            >
                {permissions.canCreate && (
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            setFormMode("create");
                            setSelectedRow(null);
                            setShowForm(true);
                        }}
                    >
                        + CREATE {module.toUpperCase()}
                    </button>
                )}
            </div>


            <DynamicGrid
                rowData={rowData}
                type={module}
                onView={permissions.canView ? row => {
                    setFormMode("view");
                    setSelectedRow(row);
                    setShowForm(true);
                } : undefined}
                onUpdate={permissions.canUpdate ? row => {
                    setFormMode("edit");
                    setSelectedRow(row);
                    setShowForm(true);
                } : undefined}
                onDelete={permissions.canDelete ? row =>
                    console.log("Delete:", row) : undefined}
            />

            <ModuleFormModal
                show={showForm}
                module={module}
                mode={formMode}
                onClose={() => setShowForm(false)}
                initialData={selectedRow}
                onSubmit={(data) => {
                    console.log("Submit Data:", data);

                    // Call your API here

                    fetchData(module);
                }}
            />
        </>
    );
};

export default Adminlayout;
