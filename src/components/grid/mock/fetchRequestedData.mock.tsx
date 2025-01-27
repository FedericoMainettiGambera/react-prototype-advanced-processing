import type { IServerSideGetRowsRequest } from "ag-grid-community";
import { tableMockData, type TableData } from "./data/tableData";

export const fetchRequestedData: (input: { request: IServerSideGetRowsRequest; endPoint: string }) => Promise<TableData[]> = async ({
  request,
  endPoint,
}) => {
  const { startRow, endRow, sortModel } = request;

  const sortedData = [...tableMockData].sort((a, b) => {
    for (const { colId, sort } of sortModel) {
      const valueA = String(a[colId as keyof typeof a]);
      const valueB = String(b[colId as keyof typeof b]);
      
      if (valueA !== valueB) {
        return sort === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    }
    return 0;
  });

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sortedData.slice(startRow, endRow));
    }, 500);
  });
};
