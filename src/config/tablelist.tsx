import type { ICellRendererParams, ColDef } from "ag-grid-community";
import type { AdminModuleType } from "./menubar";

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

export const columnMap: Record<
  AdminModuleType,
  (
    onView?: ActionHandler,
    onUpdate?: ActionHandler,
    onDelete?: ActionHandler
  ) => ColDef[]
> = {
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

};
