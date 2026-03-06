import type { ICellRendererParams, ColDef } from "ag-grid-community";
import type { ReceptionistModuleType } from "./menubar";

type ActionHandler = (row: any) => void;

const actionColumn = (
  onView?: ActionHandler,
  onUpdate?: ActionHandler,
  onDelete?: ActionHandler
): ColDef => ({
  headerName: "Actions",
  field: "actions",
  width: 200,
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

export const receptionistColumnMap: Record<
  ReceptionistModuleType,
  (
    onView?: ActionHandler,
    onUpdate?: ActionHandler,
    onDelete?: ActionHandler
  ) => ColDef[]
> = {

  // =========================
  // PATIENT TABLE
  // =========================
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

  // =========================
  // APPOINTMENT TABLE
  // =========================
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
};