import type { ICellRendererParams, ColDef } from "ag-grid-community";
 
type ActionHandler = (row: any) => void;
export const getTenantColumns = (
  onView?: ActionHandler,
  onUpdate?: ActionHandler,
  onDelete?: ActionHandler
): ColDef[] => {
 
  const columns: ColDef[] = [
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
  ];
 
  if (onView || onUpdate || onDelete) {
    columns.push({
      headerName: "Actions",
      field: "actions",
      width: 250,
      cellRenderer: (params: ICellRendererParams) => (
        <div style={{ display: "flex", gap: "8px" }}>
 
          {onView && (
            <button onClick={() => onView(params.data)}>
              View
            </button>
          )}
 
          {onUpdate && (
            <button onClick={() => onUpdate(params.data)}>
              Update
            </button>
          )}
 
          {onDelete && (
            <button onClick={() => onDelete(params.data)}>
              Delete
            </button>
          )}
 
        </div>
      ),
    });
  }
 
  return columns;
};
export const getHospitalColumns = (
  onView?: ActionHandler,
  onUpdate?:ActionHandler,
  onDelete?:ActionHandler
): ColDef[] => {
 
  const columns: ColDef[] = [
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
  ];
 
  // ✅ Add Actions column only if onView exists
  if (onView||onUpdate||onDelete) {
    columns.push({
      headerName: "Actions",
      field: "actions",
      width: 250,
      cellRenderer: (params: ICellRendererParams) => (
        <div style={{ display: "flex", gap: "8px" }}>
 
          {onView && (
            <button onClick={() => onView(params.data)}>
              View
            </button>
          )}
 
          {onUpdate && (
            <button onClick={() => onUpdate(params.data)}>
              Update
            </button>
          )}
 
          {onDelete && (
            <button onClick={() => onDelete(params.data)}>
              Delete
            </button>
          )}
 
        </div>
      ),
    });
  }
 
  return columns;
};