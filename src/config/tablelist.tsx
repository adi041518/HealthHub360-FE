import type { ICellRendererParams, ColDef } from "ag-grid-community";

type ActionHandler = (row: any) => void;

export const getTenantColumns = (
  onView: ActionHandler,
  onDelete: ActionHandler
): ColDef[] => [
  {
    headerName: "S.No",
    valueGetter: (params) => params.node!.rowIndex! + 1,
    width: 90,
  },
  { headerName: "Code", field: "code" },
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "PhoneNo", field: "phoneNo" },
  { headerName: "Dob", field: "dob" },
  { headerName: "CreatedBy", field: "createdBy" },

  {
    headerName: "Actions",
    field: "actions",
    cellRenderer: (params: ICellRendererParams) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => onView(params.data)}
          
        >
          View
        </button>

        <button
          onClick={() => onDelete(params.data)}
        >
          Delete
        </button>
      </div>
    ),
    width: 180,
  },
];
export const getHospitalColumns = (
  onView: ActionHandler,
  onDelete: ActionHandler
): ColDef[] => [
  {
    headerName: "S.No",
    valueGetter: (params) => params.node!.rowIndex! + 1,
    width: 90,
  },
  { headerName: "Hospital Name", field: "name" },
  { headerName: "Hospital Code", field: "code" },
  { headerName: "Admin Email", field: "email" },
  { headerName: "Address", field: "address" },
  { headerName: "Phone", field: "phoneNo" },
  { headerName: "Created By", field: "createdBy" },

  {
    headerName: "Actions",
    field: "actions",
    cellRenderer: (params: ICellRendererParams) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => onView(params.data)}
        >
          View
        </button>

        <button
          onClick={() => onDelete(params.data)}
        >
          Delete
        </button>
      </div>
    ),
    width: 180,
  },
];
