// components/ReceptionGrid.tsx

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import type { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { receptionistColumnMap } from "../config/receptionistTableList";
import type { ReceptionistModuleType } from "../config/menubar";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  rowData: any[];
  type: ReceptionistModuleType;
  onView?: (row: any) => void;
  onUpdate?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const ReceptionistGrid: React.FC<Props> = ({
  rowData,
  type,
  onView,
  onUpdate,
  onDelete,
}) => {
  const columnDefs = useMemo<ColDef[]>(() => {
    const generator = receptionistColumnMap[type];
    if (!generator) return [];
    return generator(onView, onUpdate, onDelete);
  }, [type, onView, onUpdate, onDelete]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: false,
      filter: false,
      resizable: true,
      flex: 2,
      editable: false,
    }),
    []
  );

  return (
    <div
      className="ag-theme-quartz"
      style={{ height: 500, width: "100%", marginTop: "20px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination
        paginationPageSize={10}
        rowHeight={65}
        headerHeight={65}
        animateRows
      />
    </div>
  );
};

export default ReceptionistGrid;