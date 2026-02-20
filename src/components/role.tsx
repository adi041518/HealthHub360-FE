import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllRolesApi, deleteRoleByIdApi } from "../axios/rolesApi";

function Role() {
    const navigate = useNavigate();
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                setLoading(true);
                const res = await fetchAllRolesApi();
                console.log("Response: ", res)
                setRoles(res.data.data);   // adjust if API structure differs
            } catch (error) {
                console.error("Error fetching roles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    },[]);

    const deleteRole = async (roleCode: string) => {
        try {
            const response = await deleteRoleByIdApi(roleCode)
            console.log("Response: ", response.data.data)
            if (response.status === 200) {
                setRoles((roles) => roles.filter(role => role.roleCode != roleCode))
            }
        } catch (error) {
            console.error(error)
            alert(error)
        }
    }
    return (
        <div className="container">

            <div className="d-flex justify-content-between">
                <h2>Roles</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/roles/create")}
                >
                    Create Role
                </button>
            </div>

            <Table bordered hover>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>RoleID</th>
                        <th>RoleName</th>
                        <th>CreatedBy</th>
                        <th>CreatedAt</th>
                        <th>UpdatedBy</th>
                        <th>UpdatedAt</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={8} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    ) : roles.length > 0 ? (
                        roles.map((role, index) => (
                            <tr key={role.id}>
                                <td>{index + 1}</td>
                                <td>{role.roleCode}</td>
                                <td>{role.roleName}</td>
                                <td>{role.CreatedBy}</td>
                                <td>{role.CreatedAt}</td>
                                <td>{role.UpdatedBy}</td>
                                <td>{role.UpdatedAt}</td>
                                <td className="d-flex space-between">
                                    <button className="btn btn-sm btn-warning">
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => navigate(`/roles/view/${role.roleCode}`)}
                                    >
                                        View
                                    </button>
                                    <button className="btn btn-sm btn-danger"
                                        onClick={() => { deleteRole(role.roleCode) }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center">
                                No Roles Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Role;
