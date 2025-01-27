import { tableMockData, type TableData } from "./data/tableData";

export const fetchAllTableData: (input: { endPoint: string }) => Promise<TableData[]> = async ({ endPoint }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(tableMockData);
    }, 500);
  });
};
