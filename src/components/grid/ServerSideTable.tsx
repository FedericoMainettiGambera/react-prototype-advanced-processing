import type { ColDef, GridReadyEvent, IServerSideDatasource } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useState } from "react";
import { buildColumnDefsFromConfiguration, type ServerSideConfiguration } from "./mock/data/tableConfiguration";
import { fetchRequestedData } from "./mock/fetchRequestedData.mock";

const createServerSideDatasource: (endPoint: string) => IServerSideDatasource = endPoint => {
  return {
    getRows: async params => {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      try {
        const requestedData = await fetchRequestedData({
          endPoint: endPoint,
          request: params.request,
        });
        params.success({ rowData: requestedData.data, rowCount: requestedData.totalRows });
      } catch (e) {
        params.fail();
      }
    },
  };
};

export default function ServerSideTable({ configuration }: { configuration: ServerSideConfiguration }) {
  const [columnDefs, setColumnDefs] = useState(buildColumnDefsFromConfiguration(configuration.columnDefs));
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      floatingFilter: true,
      flex: 1,
      enableCellChangeFlash: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    const datasource = createServerSideDatasource(configuration.endPoint);
    params.api!.setGridOption("serverSideDatasource", datasource);

    params.api!.ensureIndexVisible(5000, "top");
  }, []);

  return (
    <AgGridReact
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowModelType={configuration.rowModelType}
      onGridReady={onGridReady}
      rowGroupPanelShow="always"
      debug={true}
      serverSideEnableClientSideSort={true}
      pagination={configuration.pagination}
      cacheBlockSize={50}
      paginationAutoPageSize={configuration.pagination}
      suppressServerSideFullWidthLoadingRow={true}
    />
  );
}
