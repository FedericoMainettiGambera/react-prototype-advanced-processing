import type { ColDef } from "ag-grid-community";
import type { CellDataType } from "./CellDataType";

export type ColumnDefinition = Pick<ColDef, "field" | "headerName"> & {
  enableRowGroup: boolean;
  cellDataType: CellDataType;
  filtrable: boolean;
  sortable: boolean;
  editable: boolean;
};
