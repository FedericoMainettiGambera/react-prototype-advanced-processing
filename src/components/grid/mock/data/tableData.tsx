import localUsersData from "./localUsersData.json";

export type TableData = {
  name1: string | null;
  name2: string | null;
  birthdate: string | null;
  gender: string | null;
};

export const tableData: TableData = localUsersData as TableData;
