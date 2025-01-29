import type { TableConfiguration } from "../../types/TableConfiguration";

export const mockTableConfiguration: TableConfiguration = {
  // rowModelType: "clientSide",
  // endPoint: "/all-olympicWinners/",
  rowModelType: "serverSide",
  endPoint: "/olympicWinners/",
  pagination: false,
  columnDefs: [
    { field: "athlete", headerName: "Atleta" },
    { field: "country", headerName: "Stato" },
    { field: "sport", headerName: "Sport", enableRowGroup: true },
    { field: "year", headerName: "Anno", enableRowGroup: true },
    { field: "gold", headerName: "Oro", enableRowGroup: true },
    { field: "silver", headerName: "Argento", enableRowGroup: true },
    { field: "bronze", headerName: "Bronzo", enableRowGroup: true },
  ],
};
