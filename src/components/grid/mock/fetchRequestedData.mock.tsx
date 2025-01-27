import type { IServerSideGetRowsRequest } from "ag-grid-community";
import { tableMockData, type TableData } from "./data/tableData";

export const fetchRequestedData: (request: IServerSideGetRowsRequest) => Promise<TableData[]> = async request => {
  const { startRow, endRow } = request;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(tableMockData.slice(startRow, endRow));
    }, 500);
  });
};
