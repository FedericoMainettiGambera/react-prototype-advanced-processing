import { TableConfiguration } from "../types/TableConfiguration";

export const fetchConfiguration = async (_endpoint: string) => {
  return new Promise<TableConfiguration>(resolve => {
    setTimeout(() => {
      resolve(mockTableConfiguration);
    }, 500);
  });
};

export const mockTableConfiguration: TableConfiguration = {
  // rowModelType: "clientSide",
  // endPoint: "/all-olympicWinners/",
  rowModelType: "serverSide",
  endPoint: "/olympicWinners/",
  pagination: true,
  columnDefs: [
    { field: "athlete", headerName: "Atleta", cellDataType: "text", sortable: true, filter: "text" },
    { field: "country", headerName: "Stato", enableRowGroup: true, cellDataType: "text", sortable: true },
    { field: "sport", headerName: "Sport", enableRowGroup: true, cellDataType: "text", sortable: true },
    { field: "year", headerName: "Anno", enableRowGroup: true, cellDataType: "text", sortable: true },
    { field: "gold", headerName: "Oro", enableRowGroup: true, cellDataType: "text", sortable: true },
    { field: "silver", headerName: "Argento", enableRowGroup: true, cellDataType: "number", sortable: true },
    { field: "bronze", headerName: "Bronzo", enableRowGroup: true, cellDataType: "number", sortable: true },
    { field: "date", headerName: "Data", cellDataType: "dateString:dd/mm/yyyy", sortable: true },
  ],
};
