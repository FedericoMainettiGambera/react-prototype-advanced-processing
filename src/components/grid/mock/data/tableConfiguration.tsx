import type { ColDef, RowModelType } from "ag-grid-community";

type ServerSideRowModelType = Extract<RowModelType, "serverSide">;
type ClientSideRowModelType = Extract<RowModelType, "clientSide">;

type ColumnDefinition = Pick<ColDef, "field" | "headerName" | "sortable" | "enableRowGroup"> & {
  filter?: "text";
};
type ColumnDefinitions = ColumnDefinition[];

export type ServerSideConfiguration = {
  rowModelType: ServerSideRowModelType;
  columnDefs: ColumnDefinitions;
  endPoint: string;
  pagination: boolean;
};

export type ClientSideConfiguration = {
  rowModelType: ClientSideRowModelType;
  columnDefs: ColumnDefinitions;
  endPoint: string;
  pagination: boolean;
};

export type TableConfiguration = ClientSideConfiguration | ServerSideConfiguration;

export const buildColumnDefsFromConfiguration: (colDefs: ColumnDefinitions) => ColDef[] = (colDefs: ColumnDefinitions) => {
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

export const tableConfigurationMockData: TableConfiguration = {
  rowModelType: "serverSide",
  endPoint: "/api/example",
  pagination: false,
  columnDefs: [
    {
      field: "id",
      headerName: "ID",
      sortable: true,
      filter: "text",
      enableRowGroup: true,
    },
    {
      field: "name2",
      headerName: "Nome",
      sortable: true,
      filter: "text",
      enableRowGroup: true,
    },
    {
      field: "name1",
      headerName: "Cognome",
      sortable: true,
      filter: "text",
      enableRowGroup: true,
    },
    {
      field: "birthdate",
      headerName: "Data di nascita",
      sortable: true,
      filter: "text",
      enableRowGroup: true,
    },
    {
      field: "gender",
      headerName: "Sesso",
      sortable: true,
      filter: "text",
      enableRowGroup: true,
    },
  ],
};
