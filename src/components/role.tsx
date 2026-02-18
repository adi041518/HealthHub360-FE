import { useNavigate } from "react-router-dom"
import Table from 'react-bootstrap/Table';
function Role() {
    const navigate = useNavigate()
    return (
        <>
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

                <Table striped bordered hover>
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
                    </tbody>
                </Table>
            </div>

        </>
    )
}
export default Role