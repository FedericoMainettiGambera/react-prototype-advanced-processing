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
  pagination: false,
  rowSelectionEnabled: true,
  columnDefs: [
    { field: "athlete", headerName: "Atleta", cellDataType: "text", enableRowGroup: false, sortable: true, filter: true },
    { field: "country", headerName: "Stato", cellDataType: "text", enableRowGroup: true, sortable: true, filter: true },
    { field: "sport", headerName: "Sport", cellDataType: "text", enableRowGroup: true, sortable: true, filter: true },
    { field: "year", headerName: "Anno", cellDataType: "number", enableRowGroup: true, sortable: true, filter: true },
    { field: "gold", headerName: "Oro", cellDataType: "number", enableRowGroup: true, sortable: true, filter: true },
    { field: "silver", headerName: "Argento", cellDataType: "number", enableRowGroup: true, sortable: true, filter: true },
    { field: "bronze", headerName: "Bronzo", cellDataType: "number", enableRowGroup: true, sortable: true, filter: true },
    { field: "date", headerName: "Data", cellDataType: "dateString:dd/mm/yyyy", enableRowGroup: false, sortable: true, filter: true },
  ],
};
