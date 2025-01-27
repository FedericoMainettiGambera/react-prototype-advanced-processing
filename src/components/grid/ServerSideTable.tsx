import type { GridReadyEvent, IServerSideDatasource } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useState } from "react";
import type { ServerSideConfiguration } from "./mock/data/tableConfiguration";
import { fetchRequestedData } from "./mock/fetchRequestedData.mock";

const createServerSideDatasource: () => IServerSideDatasource = () => {
  return {
    getRows: async params => {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      try {
        const requestedData = await fetchRequestedData(params.request);
        params.success({ rowData: requestedData });
      } catch (e) {
        params.fail();
      }
    },
  };
};

export default function ServerSideTable({ configuration }: { configuration: ServerSideConfiguration }) {
  const [columnDefs, setColumnDefs] = useState(configuration.columnDefs);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    const datasource = createServerSideDatasource();
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
    />
  );
}
