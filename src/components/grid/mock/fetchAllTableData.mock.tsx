import { tableMockData, type TableData } from "./data/tableData";

export const fetchAllTableData: () => Promise<TableData[]> = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(tableMockData);
    }, 500);
  });
};
