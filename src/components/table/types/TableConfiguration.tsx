import type { ColumnDefinition } from "./ColumnDefinition";

export type TableConfiguration = {
  rowModelType: "serverSide" | "clientSide";
  endPoint: string;
  pagination: boolean;
  rowSelectionEnabled: boolean;
  columnDefs: ColumnDefinition[];
};