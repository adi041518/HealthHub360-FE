import type { ICellRendererParams, ColDef } from "ag-grid-community";
import type { AppModuleType } from "./menubar";

type ActionHandler = (row: any) => void;

const actionColumn = (
  onView?: ActionHandler,
  onUpdate?: ActionHandler,
  onDelete?: ActionHandler
): ColDef => ({
  headerName: "Actions",
  field: "actions",
  width: 250,
  cellRenderer: (params: ICellRendererParams) => (
    <div style={{ display: "flex", gap: "8px" }}>
      {onView && <button onClick={() => onView(params.data)}>View</button>}
      {onUpdate && <button onClick={() => onUpdate(params.data)}>Update</button>}
      {onDelete && <button onClick={() => onDelete(params.data)}>Delete</button>}
    </div>
  ),
});

const baseColumns: ColDef[] = [
  {
    headerName: "S.No",
    valueGetter: (params) => params.node!.rowIndex! + 1,
    width: 90,
  },
];

export const columnMap:Partial<Record<AppModuleType,
  (
    onView?: ActionHandler,
    onUpdate?: ActionHandler,
    onDelete?: ActionHandler
  ) => ColDef[]
>> = {
  tenant: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Code", field: "code" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "PhoneNo", field: "phoneNo" },
    { headerName: "Dob", field: "dob" },
    { headerName: "CreatedBy", field: "createdBy" },
    actionColumn(onView, onUpdate, onDelete),
  ],

  hospital: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Hospital Name", field: "name" },
    { headerName: "Hospital Code", field: "code" },
    { headerName: "Admin Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    actionColumn(onView, onUpdate, onDelete),
  ],

  doctor: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Doctor Name", field: "name" },
    { headerName: "Doctor Code", field: "code" },
    { headerName: "Doctor Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    actionColumn(onView, onUpdate, onDelete),
  ],

  nurse: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Nurse Name", field: "name" },
    { headerName: "Nurse Code", field: "code" },
    { headerName: "Nurse Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    actionColumn(onView, onUpdate, onDelete),
  ],

  pharmacist: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Pharmacist Name", field: "name" },
    { headerName: "Pharmacist Code", field: "code" },
    { headerName: "Pharmacist Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    actionColumn(onView, onUpdate, onDelete),
  ],

  receptionist: (onView, onUpdate, onDelete) => [
    ...baseColumns,
    { headerName: "Receptionist Name", field: "name" },
    { headerName: "Receptionist Code", field: "code" },
    { headerName: "Receptionist Email", field: "email" },
    { headerName: "Address", field: "address" },
    { headerName: "Phone", field: "phoneNo" },
    { headerName: "Created By", field: "createdBy" },
    actionColumn(onView, onUpdate, onDelete),
  ],

  patient: (onView, onUpdate, onDelete) => [
    ...baseColumns,

    { headerName: "Patient Code", field: "code" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    { headerName: "PhoneNo", field: "phoneNo" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Age", field: "age" },
    { headerName: "Admission Date", field: "admissionDate" },
    { headerName: "Hospital ID", field: "hospitalId" },
    {
      headerName: "Active",
      field: "isActive",
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
    },

    actionColumn(onView, onUpdate, onDelete),
  ],
  appointment: (onView, onUpdate, onDelete) => [
    ...baseColumns,

    { headerName: "Appointment Code", field: "code" },
    { headerName: "Date", field: "date" },
    { headerName: "Time", field: "time" },
    { headerName: "Doctor ID", field: "doctorId" },
    { headerName: "Nurse ID", field: "nurseId" },
    { headerName: "Medical ID", field: "medicalId" },
    { headerName: "Hospital ID", field: "hospitalId" },
    { headerName: "Reason", field: "reason" },
    { headerName: "Symptoms", field: "symptoms" },
    {
      headerName: "Processing",
      field: "isProcessing",
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
    },

    actionColumn(onView, onUpdate, onDelete),
  ],
  medicalRecord: (onView, onUpdate, onDelete) => [
    ...baseColumns,

    { headerName: "Record ID", field: "code" },
    { headerName: "Appointment ID", field: "appointmentId" },
    { headerName: "Patient ID", field: "patientId" },
    { headerName: "Doctor ID", field: "doctorId" },
    { headerName: "Nurse ID", field: "nurseId" },
    { headerName: "Hospital ID", field: "hospitalId" },
    { headerName: "Tenant ID", field: "tenantId" },




    // -------------------
    // Dates
    // -------------------

    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString(),
    },


    { headerName: "Created By", field: "createdBy" },


    ...(onView || onUpdate || onDelete
      ? [actionColumn(onView, onUpdate, onDelete)]
      : []),
  ],
  medicine: (onView, onUpdate, onDelete) => [
    ...baseColumns,

    { headerName: "Medicine Code", field: "code" },
    { headerName: "Medicine Name", field: "name" },
    { headerName: "Dosage", field: "dosage" },
    { headerName: "No Of Strips", field: "noOfStrips" },
    { headerName: "Tablets / Strip", field: "tabletsPerStrip" },
    { headerName: "Price / Strip", field: "pricePerStrip" },

    {
      headerName: "Expiry Date",
      field: "expiryDate",
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString(),
    },

    { headerName: "Hospital ID", field: "hospitalId" },
    { headerName: "Tenant ID", field: "tenantId" },

    { headerName: "Created By", field: "createdBy" },

    { headerName: "Updated By", field: "updatedBy" },

    actionColumn(onView, onUpdate, onDelete),
  ],

  bill: (onView, onUpdate, onDelete) => [
    ...baseColumns,

    { headerName: "Bill Code", field: "code" },
    { headerName: "Patient ID", field: "patientId" },
    { headerName: "Total Amount", field: "amount" },


    { headerName: "Created By", field: "createdBy" },

    ...(onView || onUpdate || onDelete
      ? [actionColumn(onView, onUpdate, onDelete)]
      : []),
  ],
};
