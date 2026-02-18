// Allowed Actions
export type Action = "create" | "view" | "update" | "delete";

// Allowed Modules
export type Module =
  | "Tenant"
  | "Hospital"
  | "Doctor"
  | "Nurse"
  | "Receptionist"
  | "Pharmacist"
  | "Patient"
  | "TestReport"
  | "Guardian"
  | "Appointment"
  | "Billing"
  | "Consent"
  | "MedicalRecord"
  | "Medicine"
  | "Prescription"
  | "Role";

// Privilege Model
export type Privilege = {
  module: Module;
  access: Action[];
};
