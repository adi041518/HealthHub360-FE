import { useEffect, useState } from "react";
import RoleGrid from "../components/roleGrid";
import { fetchAllRolesApi, deleteRoleByIdApi } from "../axios/rolesApi";
import NavbarComponent from "../components/navbar";
import Menubar from "../components/menubar";
import { menuRolesbar, type RoleModuleType } from "../config/menubar";
import { Modal, Button } from "react-bootstrap";
import CreateRole from "./createRole";
import ViewRoles from "./viewRoles";   // ✅ IMPORT VIEW COMPONENT

const Role = () => {
    const roleName = localStorage.getItem("roleName") || "SUPERADMIN";
    const menuBar = menuRolesbar[roleName] ?? [];

    const [selectedMenu, setSelectedMenu] = useState("");
    const [module, setModule] = useState<RoleModuleType>("role");
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [mode, setMode] = useState<"create" | "view" | "edit">("create"); // ✅ NEW
    const [selectedRoleCode, setSelectedRoleCode] = useState<string>("");   // ✅ NEW

    // 🔥 Fetch Roles
    const fetchRoles = async () => {
        try {
            setLoading(true);
            const res = await fetchAllRolesApi();
            console.log("LineNo30: ",res.data.data)
            setRoles(res.data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Initial Load
    useEffect(() => {
        if (menuBar.length > 0) {
            const first = menuBar[0];
            setSelectedMenu(first.title);
            setModule(first.module);
            fetchRoles();
        }
    }, [roleName]);

    // 🔥 Menu Click
    const handleMenuClick = (title: string, mod: RoleModuleType) => {
        setSelectedMenu(title);
        setModule(mod);
        fetchRoles();
    };

    // 🔥 DELETE
    const handleDelete = async (row: any) => {
        try {
            const res = await deleteRoleByIdApi(row.roleCode);
            if (res.status === 200) {
                setRoles(prev =>
                    prev.filter(r => r.roleCode !== row.roleCode)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 🔥 VIEW
    const handleView = (row: any) => {
        setSelectedRoleCode(row.roleCode);
        setMode("view");
        setShowModal(true);
    };

    // 🔥 EDIT
    const handleEdit = (row: any) => {
        setSelectedRoleCode(row.roleCode);
        setMode("edit");
        setShowModal(true);
    };

    // 🔥 CREATE BUTTON
    const handleCreate = () => {
        setMode("create");
        setSelectedRoleCode("");
        setShowModal(true);
    };

    return (
        <>
            <NavbarComponent />

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "60px",
                    backgroundColor: "#f8f9fa",
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
                <button
                    className="btn btn-success"
                    onClick={handleCreate}
                >
                    + CREATE {module.toUpperCase()}
                </button>
            </div>

            {/* GRID */}
            <div className="container-fluid">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <RoleGrid
                        rowData={roles}
                        onView={handleView}     // ✅ CONNECTED
                        onUpdate={handleEdit}   // ✅ CONNECTED
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* 🔥 SHARED MODAL */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {mode === "create" && `Create ${module.toUpperCase()}`}
                        {mode === "view" && `View ${module.toUpperCase()}`}
                        {mode === "edit" && `Edit ${module.toUpperCase()}`}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {mode === "create" && (
                        <CreateRole
                            onSuccess={() => {
                                setShowModal(false);
                                fetchRoles();
                            }}
                        />
                    )}

                    {mode === "edit" && (
                        <CreateRole
                            roleCode={selectedRoleCode}
                            isEdit={true}
                            onSuccess={() => {
                                setShowModal(false);
                                fetchRoles();
                            }}
                        />
                    )}

                    {mode === "view" && (
                        <ViewRoles 
                          key={selectedRoleCode}  
                          roleCode={selectedRoleCode} />
                    )}

                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Role;