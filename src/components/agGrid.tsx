import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, themeMaterial } from "ag-grid-community";
 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { getHospitalColumns, getTenantColumns } from "../config/tablelist";
 
ModuleRegistry.registerModules([AllCommunityModule]);
 
interface Props {
  rowData: any[];
  type: "tenant" | "hospital";
  onView?: (row: any) => void;
  onUpdate?: (row: any) => void;
  onDelete?: (row: any) => void;
}
 
 
 
const DynamicGrid: React.FC<Props> = ({ rowData, type,onView,onUpdate,onDelete}) => {
  
 
 
const columnDefs = useMemo(() => {
  if (type === "tenant")
    return getTenantColumns(onView, onUpdate, onDelete);
 
  if (type === "hospital")
    return getHospitalColumns(onView, onUpdate, onDelete);
 
  return [];
}, [type, onView, onUpdate, onDelete]);
 
  const defaultColDef = useMemo(() => ({
    sortable: false,
    filter: false,
    resizable: true,
    flex: 2,
    editable:false,
    
  }), []);
 
  return (
    <div
    className="ag-theme-quartz custom-grid"
      style={{ height: 500, width: "100%", marginTop: "20px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        theme={themeMaterial}
        rowHeight={65}
        headerHeight={65}
      />
    </div>
  );
};
 
export default DynamicGrid;