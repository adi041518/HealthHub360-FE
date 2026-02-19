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
}



const DynamicGrid: React.FC<Props> = ({ rowData, type }) => {
  
 const handleView = (row: any) => {
  console.log("View clicked:", row);
};

const handleDelete = (row: any) => {
  console.log("Delete clicked:", row);
};



  const columnDefs = useMemo(() => {
    if (type === "tenant") return getTenantColumns(handleView,handleDelete);
    if (type === "hospital") return getHospitalColumns(handleView,handleDelete);
    return [];
  }, [type]);

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
