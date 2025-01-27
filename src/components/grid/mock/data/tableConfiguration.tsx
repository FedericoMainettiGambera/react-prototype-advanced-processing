import type { ColDef, RowModelType } from "ag-grid-community";

type ServerSideRowModelType = Extract<RowModelType, "serverSide">;
type ClientSideRowModelType = Extract<RowModelType, "clientSide">;

type ColumnDefinition = Pick<ColDef, "field" | "headerName" | "sortable"> & {
  filter?: "text";
};
type ColumnDefinitions = ColumnDefinition[];

export type ServerSideConfiguration = {
  rowModelType: ServerSideRowModelType;
  columnDefs: ColumnDefinitions;
  endPoint: string;
  cacheBlockSize: number;
};

export type ClientSideConfiguration = {
  rowModelType: ClientSideRowModelType;
  columnDefs: ColumnDefinitions;
  endPoint: string;
};

export type TableConfiguration = ClientSideConfiguration | ServerSideConfiguration;

export const buildColumnDefsFromConfiguration: (colDefs: ColumnDefinitions) => ColDef[] = (colDefs: ColumnDefinitions) => {
  return colDefs.map(colDef => ({
    field: colDef.field,
    headerName: colDef.headerName,
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

export const tableConfigurationMockData: TableConfiguration = {
  rowModelType: "serverSide",
  endPoint: "/api/example",
  cacheBlockSize: 50000,
  columnDefs: [
    {
      field: "name2",
      headerName: "Nome",
      sortable: true,
      filter: "text",
    },
    {
      field: "name1",
      headerName: "Cognome",
      sortable: true,
      filter: "text",
    },
    {
      field: "birthdate",
      headerName: "Data di nascita",
      sortable: false,
      filter: "text",
    },
    {
      field: "gender",
      headerName: "Sesso",
      sortable: false,
      filter: "text",
    },
  ],
};
