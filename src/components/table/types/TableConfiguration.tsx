import type { RowModelType } from "ag-grid-community";
import type { ColumnDefinition } from "./ColumnDefinition";

export type TableConfiguration = {
  rowModelType: Extract<RowModelType, "serverSide" | "clientSide">;
  endPoint: string;
  pagination: boolean;
  columnDefs: ColumnDefinition[];
};