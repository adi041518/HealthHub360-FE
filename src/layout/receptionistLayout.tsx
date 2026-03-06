import { useEffect, useMemo, useState } from "react";
import NavbarComponent from "../components/navbar";
import Menubar from "../components/menubar";
import ReceptionistGrid from "../components/receptionistGrid";
import ReceptionistModuleFormModal from "../components/receptionistFormModal";

import { menuReceptionistbar, type ReceptionistModuleType } from "../config/menubar";

import { fetchAllPatients } from "../axios/patient";
import { fetchAllAppointments } from "../axios/appointment";

import { fetchRoleByIdApi } from "../axios/rolesApi";
import { hasAccess } from "../config/permission";
import { deletePatientById } from "../axios/patient";
import { deleteAppointmentById } from "../axios/appointment";
const ReceptionistLayout = () => {
    const role = localStorage.getItem("roleName") || "RECEPTIONIST";
    const roleCode = localStorage.getItem("roleCode");

    const menuBar = menuReceptionistbar[role] ?? [];

    const [selectedMenu, setSelectedMenu] = useState("");
    const [module, setModule] = useState<ReceptionistModuleType>("patient");
    const [rowData, setRowData] = useState<any[]>([]);
    const [roleDoc, setRoleDoc] = useState<any>(null);

    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create");
    const [selectedRow, setSelectedRow] = useState<any>(null);

    // 🔐 Permission Check
    const permissions = useMemo(() => ({
        canView: hasAccess(roleDoc, module, "view"),
        canCreate: hasAccess(roleDoc, module, "create"),
        canUpdate: hasAccess(roleDoc, module, "update"),
        canDelete: hasAccess(roleDoc, module, "delete"),
    }), [roleDoc, module]);

    // API Map
    const apiMap: Record<ReceptionistModuleType, () => Promise<any>> = {
        patient: fetchAllPatients,
        appointment: fetchAllAppointments,
    };

    const fetchData = async (mod: ReceptionistModuleType) => {
        const response = await apiMap[mod]();
        console.log("response: ", response)
        setRowData(response.data.data || []);
    };

    const handleView = (row: any) => {
        setSelectedRow(row);
        setFormMode("view");
        setShowForm(true);
    };

    const handleEdit = (row: any) => {
        setSelectedRow(row);
        setFormMode("edit");
        setShowForm(true);
    };

    const handleDelete = async (row: any) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete this ${module}?`
        );

        if (!confirmDelete) return;

        try {
            if (module === "patient") {
                await deletePatientById(row.code);
            }

            if (module === "appointment") {
                await deleteAppointmentById(row.code);
            }

            fetchData(module); // refresh grid
        } catch (err: any) {
            alert(err.response?.data?.message);
        }
    };
    // Fetch role document
    useEffect(() => {
        if (!roleCode) return;
        fetchRoleByIdApi(roleCode).then(res =>
            setRoleDoc(res.data.data)
        );
    }, []);

    // Initial load
    useEffect(() => {
        if (menuBar.length > 0) {
            const first = menuBar[0];
            setSelectedMenu(first.title);
            setModule(first.module);
            fetchData(first.module);
        }
    }, [role]);

    const handleMenuClick = (title: string, mod: ReceptionistModuleType) => {
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

            {/* CREATE BUTTON */}
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

            {/* GRID */}
            <ReceptionistGrid
                rowData={rowData}
                type={module}
                onView={permissions.canView ? handleView : undefined}
                onUpdate={permissions.canUpdate ? handleEdit : undefined}
                onDelete={permissions.canDelete ? handleDelete : undefined}
            />

            {/* FORM MODAL */}
            <ReceptionistModuleFormModal
                show={showForm}
                module={module}
                mode={formMode}
                onClose={() => setShowForm(false)}
                initialData={selectedRow}
                onSubmit={() => {
                    fetchData(module);
                }}
            />
        </>
    );
};

export default ReceptionistLayout;