import { TableConfiguration } from "../types/TableConfiguration";
import { mockTableConfiguration } from "./mock-data/mock-table-configuration";

export const fetchConfiguration = async (_endpoint: string) => {
  return new Promise<TableConfiguration>(resolve => {
    setTimeout(() => {
      resolve(mockTableConfiguration);
    }, 500);
  });
};
