import { useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import type { ClientSideConfiguration } from "./mock/data/tableConfiguration";
import { fetchAllTableData } from "./mock/fetchAllTableData.mock";

export const useTableDataQuery = (endPoint: string) => {
  const query = useQuery({
    queryKey: ["table-configuration"],
    queryFn: () => fetchAllTableData({ endPoint }),
  });

  return query;
};

export default function ClientSideTable({ configuration }: { configuration: ClientSideConfiguration }) {
  const [columnDefs, setColumnDefs] = useState(configuration.columnDefs);

  const tableDataQuery = useTableDataQuery(configuration.endPoint);

  return (
    <AgGridReact
      loading={tableDataQuery.isLoading}
      rowData={tableDataQuery.data as any[]}
      columnDefs={columnDefs}
      rowModelType={configuration.rowModelType}
      debug={true}
    />
  );
}
