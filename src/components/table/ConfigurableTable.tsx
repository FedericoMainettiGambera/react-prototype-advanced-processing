import { useQuery } from "@tanstack/react-query";
import type { ColDef, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useState } from "react";
import { fetchConfiguration } from "./api/fetchConfiguration";
import { fetchData } from "./api/fetchData";
import type { TableConfiguration } from "./types/TableConfiguration";
import { buildColumnDefs } from "./utils/buildColumnDefs";
import { createServerSideDatasource } from "./utils/createServerSideDatasource";

export const useTableConfigurationQuery = (endPoint: string) => {
  const query = useQuery<TableConfiguration>({
    queryKey: ["table-configuration", endPoint],
    queryFn: () => fetchConfiguration(endPoint),
  });

  return query;
};

export default function ConfigurableTable({ configurationEndPoint }: { configurationEndPoint: string }) {
  const { isPending, isError, error, data: configuration } = useTableConfigurationQuery(configurationEndPoint);

  if (isPending) {
    return <div>Caricamento configurazione tabella...</div>;
  }

  if (isError) {
    return <div>Errore nel caricare la tabella: {error.message || "Errore sconosciuto"}</div>;
  }

  return <Table configuration={configuration} />;
}

export const useTableDataQuery = ({ enabled, endPoint }: { endPoint: string; enabled: boolean }) => {
  const query = useQuery({
    queryKey: ["table-data", endPoint],
    queryFn: () => fetchData(endPoint),
    enabled: enabled,
  });

  return query;
};

function Table({ configuration }: { configuration: TableConfiguration }) {
  const [columnDefs] = useState(buildColumnDefs(configuration.columnDefs));
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      floatingFilter: true,
      flex: 1,
      enableCellChangeFlash: true,
    };
  }, []);

  // client side data (all table data)
  const tableDataQuery = useTableDataQuery({
    endPoint: configuration.endPoint,
    enabled: configuration.rowModelType === "clientSide",
  });

  // server side data (data sourse to fetch partial table data)
  const onGridReady = useCallback((params: GridReadyEvent) => {
    if (configuration.rowModelType !== "serverSide") {
      return;
    }

    const datasource = createServerSideDatasource({
      endPoint: configuration.endPoint,
    });
    params.api!.setGridOption("serverSideDatasource", datasource);
  }, []);

  return (
    <AgGridReact
      // client side data props
      loading={configuration.rowModelType === "clientSide" ? tableDataQuery.isLoading : undefined}
      rowData={configuration.rowModelType === "clientSide" ? tableDataQuery.data?.data : undefined}
      //server side data props
      onGridReady={onGridReady}
      serverSideEnableClientSideSort={configuration.rowModelType === "serverSide" ? true : undefined}
      cacheBlockSize={configuration.rowModelType === "serverSide" ? 50 : undefined}
      suppressServerSideFullWidthLoadingRow={configuration.rowModelType === "serverSide" ? true : undefined}
      // common props
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowModelType={configuration.rowModelType}
      rowGroupPanelShow={columnDefs.find(col => col.enableRowGroup) ? "always" : "never"}
      pagination={configuration.pagination}
      paginationAutoPageSize={configuration.pagination}
      debug={true}
    />
  );
}
