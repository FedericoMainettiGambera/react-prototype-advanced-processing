import { tableMockData, type TableData } from "./data/tableData";

type FetchResponse = {
  data: TableData[];
};

export const fetchAllTableData: (input: { endPoint: string }) => Promise<FetchResponse> = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: tableMockData,
      });
    }, 500);
  });
};
