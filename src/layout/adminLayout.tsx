import { useEffect, useMemo, useState } from "react";
import DynamicGrid from "../components/agGrid";
import Menubar from "../components/menubar";
import NavbarComponent from "../components/navbar";
import { menuAdminbar } from "../config/menubar";
import { fetchAllTenants } from "../axios/tenant";
import { fetchAllHospital } from "../axios/hospital";
import { hasAccess } from "../config/permission";
import { fetchRoleByIdApi } from "../axios/rolesApi";
import TenantFormModal from "../components/FormModal";
 
// 🔥 Import your real APIs
 
 
const Adminlayout = () => {
    const role = "superadmin"; // get this from token in real case
    const menuBar = menuAdminbar[role] || [];
 
    const [selectedMenu, setSelectedMenu] = useState<string>("");
    const [rowData, setRowData] = useState<any[]>([]);
    const [module, setModule] = useState<string>("");
    const [roleDoc, setRoleDoc] = useState<any>(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit" | "view">("create");
    const [selectedRow, setSelectedRow] = useState<any>(null);
    console.log(module)
    const permissions = useMemo(() => {
        return {
            canView: hasAccess(roleDoc, module, "view"),
            canCreate: hasAccess(roleDoc, module, "create"),
            canUpdate: hasAccess(roleDoc, module, "update"),
            canDelete: hasAccess(roleDoc, module, "delete"),
        };
    }, [roleDoc, module]);
    const apiMap: Record<string, () => Promise<any>> = {
        Tenants: fetchAllTenants,
        Hospitals: fetchAllHospital,
    };
 
 
    const fetchData = async (key: string) => {
        try {
            const apiFunction = apiMap[key];
            if (!apiFunction) {
                console.error("No API mapped for:", key);
                setRowData([]);
                return;
            }
 
            const response = await apiFunction();
            setRowData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            setRowData([]);
        } finally {
 
        }
    };
    useEffect(() => {
        const fetchRole = async () => {
            try {
                const roleCode = localStorage.getItem("roleCode");
 
                if (!roleCode) return;
 
                const response = await fetchRoleByIdApi(roleCode);
                console.log("the role DOc is :", response)
                setRoleDoc(response.data.data);   // full role document
 
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        };
 
        fetchRole();
    }, []);
    useEffect(() => {
        if (menuBar.length > 0) {
            const defaultItem = menuBar[0];
 
            setSelectedMenu(defaultItem.title);
            setModule(defaultItem.module);   // 🔥 important
            fetchData(defaultItem.title);
        }
    }, []);
 
    const handleMenuClick = (key: string, module: string) => {
        setSelectedMenu(key);
        setModule(module);
        fetchData(key);
    };
    const handleView = (row: any) => {
        setFormMode("view");
        setSelectedRow(row);
        setShowForm(true);
    };
 
    const handleUpdate = (row: any) => {
        setFormMode("edit");
        setSelectedRow(row);
        setShowForm(true);
    };
 
    const handleDelete = (row: any) => {
        console.log("Delete clicked:", row);
    };
    const handleSubmitTenant = async (data: any) => {
        if (formMode === "edit") {
            console.log("Updating tenant", data);
        } else {
            console.log("Creating tenant", data);
        
        }
 
        fetchData(selectedMenu);
    };
    return (
        <>
            <NavbarComponent />
 
            {/* Menu Bar */}
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
 
            {/* Grid */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                    marginRight: "10px"
                }}
            >
                {permissions.canCreate && (
                    <button className="btn btn-success" onClick={() => {
                        setFormMode("create");
                        setSelectedRow(null);
                        setShowForm(true);
                    }}>
                        + CREATE {module?.toUpperCase()}
                    </button>
                )}
            </div>
 
            <DynamicGrid
                rowData={rowData}
                type={selectedMenu === "Tenants" ? "tenant" : "hospital"}
                onView={permissions.canView ? handleView : undefined}
                onUpdate={permissions.canUpdate ? handleUpdate : undefined}
                onDelete={permissions.canDelete ? handleDelete : undefined}
            />
            <TenantFormModal
  show={showForm}
  mode={formMode}
  onClose={() => setShowForm(false)}
  onSubmit={handleSubmitTenant}
  initialData={selectedRow}
/>
 
        </>
    );
};
 
export default Adminlayout;
 