export type ModuleType =
  | "tenant"
  | "hospital"
  | "doctor"
  | "nurse"
  | "pharmacist"
  | "receptionist"
  |"role"
export type MenuItem = {
  title: string;
  module: ModuleType;
};

export const menuAdminbar: Record<string, MenuItem[]> = {
  SUPERADMIN: [
    { title: "Tenants", module: "tenant" },
    { title: "Hospitals", module: "hospital" }
  ],
  TENANT: [
    { title: "Hospitals", module: "hospital" }
  ],
  HOSPITALADMIN: [
    { title: "Doctor", module: "doctor" },
    { title: "Nurse", module: "nurse" },
    { title: "Pharmacist", module: "pharmacist" },
    { title: "Receptionist", module: "receptionist" }
  ]
};
export const menuRolesbar: Record<string, MenuItem[]> = {
  SUPERADMIN: [
    { title: "Roles", module: "role" }
  ]
};