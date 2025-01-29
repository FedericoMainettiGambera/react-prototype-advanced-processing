import type { ColDef, RowModelType } from "ag-grid-community";

export type ColumnDefinition = Pick<ColDef, "field" | "headerName" | "sortable" | "enableRowGroup"> & {
  filter?: "text";
};

export type TableConfiguration = {
  rowModelType: Extract<RowModelType, "serverSide" | "clientSide">;
  endPoint: string;
  pagination: boolean;
  columnDefs: ColumnDefinition[];
};