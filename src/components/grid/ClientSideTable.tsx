import { useQuery } from "@tanstack/react-query";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { buildColumnDefsFromConfiguration, type ClientSideConfiguration } from "./mock/data/tableConfiguration";
import { fetchAllTableData } from "./mock/fetchAllTableData.mock";

export const useTableDataQuery = (endPoint: string) => {
  const query = useQuery({
    queryKey: ["table-configuration"],
    queryFn: () => fetchAllTableData({ endPoint }),
  });

  return query;
};

export default function ClientSideTable({ configuration }: { configuration: ClientSideConfiguration }) {
  const [columnDefs, setColumnDefs] = useState(buildColumnDefsFromConfiguration(configuration.columnDefs));
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      floatingFilter: true,
      flex: 1,
      enableCellChangeFlash: true,
    };
  }, []);

  const tableDataQuery = useTableDataQuery(configuration.endPoint);

  return (
    <AgGridReact
      loading={tableDataQuery.isLoading}
      rowData={tableDataQuery.data?.data}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowModelType={configuration.rowModelType}
      rowGroupPanelShow="always"
      pagination={configuration.pagination}
      paginationAutoPageSize={configuration.pagination}
      suppressServerSideFullWidthLoadingRow={true}
      debug={true}
    />
  );
}
