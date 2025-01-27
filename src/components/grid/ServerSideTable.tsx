import type { GridReadyEvent, IServerSideDatasource } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useState } from "react";
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
        params.success({ rowData: requestedData });
      } catch (e) {
        params.fail();
      }
    },
  };
};

export default function ServerSideTable({ configuration }: { configuration: ServerSideConfiguration }) {
  const [columnDefs, setColumnDefs] = useState(buildColumnDefsFromConfiguration(configuration.columnDefs));

  const onGridReady = useCallback((params: GridReadyEvent) => {
    const datasource = createServerSideDatasource(configuration.endPoint);
    params.api!.setGridOption("serverSideDatasource", datasource);

    params.api!.ensureIndexVisible(5000, "top");
  }, []);

  return (
    <AgGridReact
      columnDefs={columnDefs}
      rowModelType={configuration.rowModelType}
      onGridReady={onGridReady}
      cacheBlockSize={configuration.cacheBlockSize}
      debug={true}
      // if client has all the rows, switch to client side sorting
      serverSideEnableClientSideSort={true}
    />
  );
}
