import type { ColDef, RowModelType } from "ag-grid-community";

type ServerSideRowModelType = Extract<RowModelType, "serverSide">;
type ClientSideRowModelType = Extract<RowModelType, "clientSide">;

type ColumnDefinition = Pick<ColDef, "field" | "headerName">;
type ColumnsDefinition = ColumnDefinition[];

export type ServerSideConfiguration = {
  rowModelType: ServerSideRowModelType;
  columnDefs: ColumnsDefinition;
  getEndPoint: string;
  cacheBlockSize: number;
};

export type ClientSideConfiguration = {
  rowModelType: ClientSideRowModelType;
  columnDefs: ColumnsDefinition;
  getEndPoint: string;
};

export type TableConfiguration = ClientSideConfiguration | ServerSideConfiguration;

export const tableConfigurationMockData: TableConfiguration = {
  rowModelType: "serverSide",
  getEndPoint: "/api/example",
  cacheBlockSize: 50,
  columnDefs: [
    {
      field: "name2",
      headerName: "Nome",
    },
    {
      field: "name1",
      headerName: "Cognome",
    },
    {
      field: "birthdate",
      headerName: "Data di nascita",
    },
    {
      field: "gender",
      headerName: "Sesso",
    },
  ],
};
