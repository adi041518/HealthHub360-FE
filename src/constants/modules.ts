import type { Module, Action } from "../types/role";

export const MODULES: Module[] = [
  "Tenant",
  "Hospital",
  "Doctor",
  "Nurse",
  "Receptionist",
  "Pharmacist",
  "Patient",
  "TestReport",
  "Guardian",
  "Appointment",
  "Billing",
  "Consent",
  "MedicalRecord",
  "Medicine",
  "Prescription",
  "Role"
];

export const ACTIONS: Action[] = [
  "create",
  "view",
  "update",
  "delete"
];
