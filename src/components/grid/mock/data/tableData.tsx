import localUsersData from "./localUsersData.json";

export type TableData = {
  id: number;
  name1: string | null;
  name2: string | null;
  birthdate: string | null;
  gender: string | null;
};

export const tableMockData: TableData[] = (localUsersData as Exclude<TableData, "id">[]).map((data, idx) => ({
  ...data,
  id: idx,
}));
