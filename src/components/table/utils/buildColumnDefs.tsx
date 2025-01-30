import type { ColDef } from "ag-grid-community";
import type { ColumnDefinition } from "../types/ColumnDefinition";

export const buildColumnDefs: (colDefs: ColumnDefinition[]) => ColDef[] = colDefs => {
  return colDefs.map(colDef => {
    const hasFilter = Boolean(colDef.filter);

    return {
      field: colDef.field,
      colId: colDef.field,
      cellDataType: colDef.cellDataType,
      headerName: colDef.headerName,
      enableRowGroup: colDef.enableRowGroup,
      sortable: colDef.sortable,
      filter: colDef.filter === "text" ? "agTextColumnFilter" : undefined,
      floatingFilter: hasFilter,
      filterParams:
        colDef.filter === "text"
          ? {
              filterOptions: ["contains", "startsWith"],
            }
          : undefined,
    };
  });
};
