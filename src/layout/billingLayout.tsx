import { useEffect, useMemo, useState } from "react";
import NavbarComponent from "../components/navbar";
import Menubar from "../components/menubar";

import { menuBillingbar, type BillingModuleType } from "../config/menubar";
import { fetchAllBills, createBill, deleteBill } from "../axios/billing";

import { fetchRoleByIdApi } from "../axios/rolesApi";
import { hasAccess } from "../config/permission";
import { IoMdAdd } from "react-icons/io";
import { showSuccess, showError } from "../toast/toast";
import BillFormModal from "../components/billFormModal";
import DynamicGrid from "../components/agGrid";
import { columnMap } from "../config/tablelist";
const BillingLayout = () => {

    const role = localStorage.getItem("roleName") || "SUPERADMIN";
    const menuBar = menuBillingbar[role] ?? [];

    const [selectedMenu, setSelectedMenu] = useState("");
    const [module, setModule] = useState<BillingModuleType>("bill");
    const [rowData, setRowData] = useState<any[]>([]);
    const [roleDoc, setRoleDoc] = useState<any>(null);

    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "view">("create");
    const [selectedRow, setSelectedRow] = useState<any>(null);

    // ✅ Permissions
    const permissions = useMemo(() => ({
        canView: hasAccess(roleDoc, module, "view"),
        canCreate: hasAccess(roleDoc, module, "create"),
        canDelete: hasAccess(roleDoc, module, "delete"),
    }), [roleDoc, module]);

    const fetchData = async () => {
        try {
            const res = await fetchAllBills();
            setRowData(res.data.data || []);
        } catch (err) {
            console.error("Billing fetch failed", err);
            setRowData([]);
        }
    };

    // const columnMap={
    //     BILLING:billingColumnMap
    // }
    // const selectedColumnMap = columnMap[appModuleType];
    useEffect(() => {
        const roleCode = localStorage.getItem("roleCode");
        if (!roleCode) return;

        fetchRoleByIdApi(roleCode).then(res =>
            setRoleDoc(res.data.data)
        );
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const handleMenuClick = (title: string, mod: BillingModuleType) => {
        setSelectedMenu(title);
        setModule(mod);
    };

    return (
        <>
            <NavbarComponent />

            <div style={{
                display: "flex",
                height: "85px",
                backgroundColor: "#f8f9fa",
                alignItems: "center",
            }}>
                <Menubar
                    menubar={menuBar}
                    onClick={handleMenuClick}
                    selectedMenu={selectedMenu}
                />
            </div>

            {/* CREATE BUTTON */}
            <div style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
                marginRight: "15px",
            }}>
                {permissions.canCreate && (
                    <button
                        className="btn d-flex align-items-center gap-2"
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
                        <IoMdAdd size={20} />
                        CREATE BILL
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
                onDelete={permissions.canDelete ? async row => {
                    const confirmDelete = window.confirm("Delete this bill?");
                    if (!confirmDelete) return;
                    try {
                        await deleteBill(row.code);
                        showSuccess("Bill deleted");
                        fetchData();
                    } catch (err: any) {
                        showError(err?.response?.data?.message || "Delete failed");
                    }
                    fetchData();
                } : undefined}
            />
            {/* BILL MODAL */}
            {showForm && (
                <BillFormModal
                    show={showForm}
                    mode={formMode}
                    initialData={selectedRow}
                    onClose={() => setShowForm(false)}
                    onSubmit={async (data) => {
                        try {
                            await createBill(data.patientId!);
                            showSuccess("Bill created");
                            fetchData();
                            setShowForm(false);
                        } catch (err: any) {
                            showError(err?.response?.data?.message || "Creation failed");
                        }
                    }}
                />
            )}
        </>
    );
};

export default BillingLayout;