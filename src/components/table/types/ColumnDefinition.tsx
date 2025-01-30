import type { ColDef } from "ag-grid-community";
import type { CellDataType } from "./CellDataType";

export type ColumnDefinition = Pick<ColDef, "field" | "headerName" | "enableRowGroup"> & {
  cellDataType: CellDataType;
  filter?: "text";
  sortable: boolean;
};
