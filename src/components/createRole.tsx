import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ModuleCard from "./moduleCard";

import { MODULES } from "../constants/modules";
import type { Privilege, Module, Action } from "../types/role";
import { ACTIONS } from "../constants/modules";

function CreateRole() {

    const navigate = useNavigate();

    const [roleName, setRoleName] = useState<string>("");

    // Privileges
    const [privileges, setPrivileges] = useState<Privilege[]>(
        MODULES.map((module) => ({
            module,
            access: []
        }))
    );

    // Toggle checkbox
    const handleAccessChange = (moduleName: Module, action: Action) => {

        setPrivileges((prev) =>
            prev.map((p) =>
                p.module === moduleName
                    ? {
                        ...p,
                        access: p.access.includes(action)
                            ? p.access.filter((a) => a !== action)
                            : [...p.access, action]
                    }
                    : p
            )
        );
    };

    const handleSelectAll = (moduleName: Module, checked: boolean) => {

        setPrivileges(prev =>
            prev.map(p =>
                p.module === moduleName
                    ? {
                        ...p,
                        access: checked ? ACTIONS : []
                    }
                    : p
            )
        );

    };

    // Save Role
    const handleSubmit = () => {

        if (!roleName.trim()) {
            alert("Role name is required!");
            return;
        }

        const payload = {
            roleName,
            privileges
        };

        console.log("ROLE PAYLOAD:", payload);

        // 👉 Later:
        // POST API
        // dispatch Redux
        // navigate back

        navigate("/roles");
    };

    return (
        <div className="container mt-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Create Role</h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/roles")}
                >
                    Back
                </button>
            </div>

            {/* Role Name */}
            <div className="mb-4">
                <label className="form-label fw-bold">
                    Role Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter role name..."
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                />
            </div>

            {/* Module Grid */}
            <div className="row">
                {privileges.map((p) => (
                    <div
                        key={p.module}
                        className="col-lg-4 col-md-6 mb-3"
                    >
                        <ModuleCard
                            module={p.module}
                            access={p.access}
                            onChange={handleAccessChange}
                            onSelectAll={handleSelectAll}
                        />
                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="d-flex justify-content-end mt-4">
                <button
                    className="btn btn-primary px-4"
                    onClick={handleSubmit}
                >
                    Create Role
                </button>
            </div>

        </div>
    );
}

export default CreateRole;
