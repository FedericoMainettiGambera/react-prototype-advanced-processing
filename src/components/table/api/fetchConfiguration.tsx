import { TableConfiguration } from "../types/TableConfiguration";

// fake api call to retrieve table configuration data
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
  uniqueIdField: "id",
  columnDefs: [
    { field: "athlete", headerName: "Atleta", cellDataType: "text", enableRowGroup: false, sortable: true, filtrable: true, editable: true, },
    { field: "country", headerName: "Stato", cellDataType: "text", enableRowGroup: true, sortable: true, filtrable: true, editable: true, },
    { field: "sport", headerName: "Sport", cellDataType: "text", enableRowGroup: true, sortable: true, filtrable: true, editable: true, },
    { field: "year", headerName: "Anno", cellDataType: "number", enableRowGroup: true, sortable: true, filtrable: true, editable: true, },
    { field: "gold", headerName: "Oro", cellDataType: "number", enableRowGroup: true, sortable: true, filtrable: true, editable: true, },
    { field: "silver", headerName: "Argento", cellDataType: "number", enableRowGroup: true, sortable: true, filtrable: true, editable: true, },
    { field: "bronze", headerName: "Bronzo", cellDataType: "number", enableRowGroup: true, sortable: true, filtrable: true, editable: true, },
    { field: "date", headerName: "Data", cellDataType: "dateString:dd/mm/yyyy", enableRowGroup: false, sortable: true, filtrable: true, editable: true, },
  ],
};
