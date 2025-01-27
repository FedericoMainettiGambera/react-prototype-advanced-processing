import type { IServerSideGetRowsRequest } from "ag-grid-community";
import { tableMockData, type TableData } from "./data/tableData";

export const fetchRequestedData: (input: { request: IServerSideGetRowsRequest; endPoint: string }) => Promise<TableData[]> = async ({
  request,
  endPoint,
}) => {
  const { startRow, endRow, sortModel, filterModel } = request;

  const filteredData = [...tableMockData].filter(row => {
    if (!filterModel || Object.keys(filterModel).length === 0) {
      return true;
    }

    return Object.entries(filterModel).every(([colId, filterConfig]) => {
      const value = String(row[colId as keyof typeof row]).toLowerCase();
      const filter = (filterConfig as { filter: string }).filter.toLowerCase();

      switch ((filterConfig as { type: string }).type) {
        case 'contains':
          return value.includes(filter);
        case 'startsWith':
          return value.startsWith(filter);
        default:
          return true;
      }
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
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
