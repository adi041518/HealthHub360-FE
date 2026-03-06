import type { ICellRendererParams, ColDef } from "ag-grid-community";
import type { BillingModuleType } from "./menubar";

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

export const billingColumnMap: Record<
  BillingModuleType,
  (
    onView?: ActionHandler,
    onUpdate?: ActionHandler,
    onDelete?: ActionHandler
  ) => ColDef[]
> = {
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