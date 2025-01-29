import type { ColDef } from "ag-grid-community";
import type { ColumnDefinition } from "../types/TableConfiguration";

export const buildColumnDefs: (colDefs: ColumnDefinition[]) => ColDef[] = colDefs => {
  return colDefs.map(colDef => ({
    field: colDef.field,
    headerName: colDef.headerName,
    enableRowGroup: colDef.enableRowGroup,
    sortable: colDef.sortable,
    filter: colDef.filter === "text" ? "agTextColumnFilter" : undefined,
    filterParams:
      colDef.filter === "text"
        ? {
            filterOptions: ["contains", "startsWith"],
          }
        : undefined,
  }));
};
