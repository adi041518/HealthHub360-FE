import { useEffect, useMemo, useState } from "react";
import DynamicGrid from "../components/agGrid";
import Menubar from "../components/menubar";
import NavbarComponent from "../components/navbar";
import { menuAdminbar, type AdminModuleType } from "../config/menubar";
import { Create, Delete, fetchAllTenants, Update } from "../axios/tenant";
import { fetchAllHospital } from "../axios/hospital";
import { fetchAllDoctors } from "../axios/doctors";
import { fetchAllNurse } from "../axios/nurse";
import { fetchAllPharmacist } from "../axios/pharmacist";
import { fetchAllReceptionist } from "../axios/receptionist";
import { fetchAllMedicines } from "../axios/medicines";
import { hasAccess } from "../config/permission";
import { fetchRoleByIdApi } from "../axios/rolesApi";
import ModuleFormModal from "../components/FormModal";
import { IoMdPersonAdd } from "react-icons/io";
import { fetchAllPatients } from "../axios/patient";
import { fetchAllAppointments } from "../axios/appointment";
import { fetchAllMedicalRecords } from "../axios/medicalRecord";
import ReceptionistModuleFormModal from "../components/receptionistFormModal";
import { showSuccess, showError } from "../toast/toast";
import MedicalRecordModal from "../components/medicalRecordModal";
import MedicineModal from "../components/medicineModal";
import { columnMap } from "../config/tablelist";
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
    const [loading, setLoading] = useState(false);
    const [formloading, setFormLoading] = useState(false);

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
        patient: fetchAllPatients,
        appointment: fetchAllAppointments,
        medicalRecord: fetchAllMedicalRecords,
        medicine: fetchAllMedicines,
    };

    const fetchData = async (mod: AdminModuleType) => {
        try {
            setLoading(true);
            const response = await apiMap[mod]();
            setRowData(response.data.data || []);
        } catch (error) {
            console.error("Fetch failed:", error);
            setRowData([]);
        } finally {
            setLoading(false);
        }
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

    const isReceptionistModule =
        role === "RECEPTIONIST" && (module === "patient" || module === "appointment")
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
                        className="btn d-flex align-items-center gap-2 poppins-extrabold"
                        style={{
                            backgroundColor: "#FF6A00",
                            color: "#fff",
                            padding: "8px 18px",
                            borderRadius: "8px",
                            border: "none",
                        }}
                        onClick={() => {
                            setFormMode("create");
                            setSelectedRow(null);
                            setShowForm(true);
                        }}
                    >
                        <IoMdPersonAdd size={20} />
                        CREATE {module.toUpperCase()}
                    </button>
                )}
            </div>


            <DynamicGrid
                rowData={rowData}
                type={module}
                columnMap={columnMap}
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
                onDelete={
                    permissions.canDelete
                        ? async (row) => {
                            const confirmDelete = window.confirm(
                                "Do you want to delete this user?"
                            );

                            if (!confirmDelete) return;

                            try {
                                await Delete(row.code, module);
                                await fetchData(module);
                            } catch (error) {
                                console.error("Delete failed:", error);
                            }
                        }
                        : undefined
                } />
            {/* 🔥 RECEPTIONIST MODAL */}
            {isReceptionistModule && (
                <ReceptionistModuleFormModal
                    show={showForm}
                    module={module as "patient" | "appointment"}
                    mode={formMode}
                    initialData={selectedRow}
                    onClose={() => setShowForm(false)}
                    onSubmit={async () => {
                        await fetchData(module);
                        setShowForm(false);
                    }}
                />
            )}

            {/* 🔥 NORMAL MODULE MODAL (ALL OTHER ROLES) */}
            {!isReceptionistModule && module != "medicalRecord" && module != "medicine" && (
                <ModuleFormModal
                    show={showForm}
                    module={module}
                    mode={formMode}
                    onClose={() => setShowForm(false)}
                    initialData={selectedRow}
                    onSubmit={async (data) => {
                        try {
                            setLoading(true);
                            setFormLoading(true);

                            if (formMode === "create") {
                                await Create(data, module);
                            } else if (formMode === "edit") {
                                await Update(data, selectedRow.code, module);
                            }

                            await fetchData(module);
                            setShowForm(false);

                        } catch (error: any) {

                        } finally {
                            setFormLoading(false);
                            setLoading(false);
                        }
                    }}
                />
            )}
            {module === "medicine" && (
                <MedicineModal
                    show={showForm}
                    mode={formMode}
                    initialData={selectedRow}
                    loading={formloading}
                    onClose={() => setShowForm(false)}
                    onSubmit={async (data) => {
                        try {
                            setFormLoading(true);

                            if (formMode === "create") {
                                await Create(data, module);
                            } else {
                                await Update(data, selectedRow.code, module);
                            }

                            fetchData(module);
                            setShowForm(false);
                        } finally {
                            setFormLoading(false);
                        }
                    }}
                />
            )}
            {module === "medicalRecord" && (
                <MedicalRecordModal
                    show={showForm}
                    mode={formMode}
                    initialData={selectedRow}
                    module={role}
                    loading={formloading}
                    onClose={() => setShowForm(false)}
                    onSubmit={async (data) => {
                        try {
                            setFormLoading(true);

                            if (formMode === "create") {
                                await Create(data, "medicalRecord");
                                showSuccess("Medical Record Created");
                            } else {
                                await Update(data, selectedRow.code, "medicalRecord");
                                showSuccess("Medical Record Updated");
                            }

                            fetchData("medicalRecord");
                            setShowForm(false);
                        } catch (err: any) {
                            showError(
                                err?.response?.data?.message || "Operation failed"
                            );
                        } finally {
                            setFormLoading(false);
                        }
                    }}
                />
            )}
        </>
    );
};

export default Adminlayout;


