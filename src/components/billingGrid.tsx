import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import type { ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import type { BillingModuleType } from "../config/menubar";
import { billingColumnMap } from "../config/billingTableList";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  rowData: any[];
  type: BillingModuleType;
  onView?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const BillingGrid: React.FC<Props> = ({
  rowData,
  type,
  onView,
  onDelete,
}) => {

  const columnDefs = useMemo<ColDef[]>(() => {
    const generator = billingColumnMap[type];
    if (!generator) return [];

    // Pass undefined for update since not supported
    return generator(onView, undefined, onDelete);
  }, [type, onView, onDelete]);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: false,
    filter: false,
    resizable: true,
    flex: 2,
    editable: false,
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
        rowHeight={65}
        headerHeight={65}
        animateRows
      />
    </div>
  );
};

export default BillingGrid;