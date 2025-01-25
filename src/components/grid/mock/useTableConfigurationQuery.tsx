import { useQuery } from "@tanstack/react-query";
import type { TableConfiguration } from "./data/tableConfiguration";
import { fetchTableConfiguration } from "./fetchTableConfiguration.mock";

export const useTableConfigurationQuery = () => {
  const query = useQuery<TableConfiguration>({
    queryKey: ["table-configuration"],
    queryFn: () => fetchTableConfiguration(),
  });

  return query;
};
