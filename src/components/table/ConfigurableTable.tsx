import { AG_GRID_LOCALE_IT } from "@ag-grid-community/locale";
import { useQuery } from "@tanstack/react-query";
import type { ColDef, GridReadyEvent, SideBarDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { fetchConfiguration } from "./api/fetchConfiguration";
import { fetchData } from "./api/fetchData";
import { ColumnStateControls } from "./ColumnStateControls";
import type { TableConfiguration } from "./types/TableConfiguration";
import { buildColumnDefs } from "./utils/buildColumnDefs";
import { createServerSideDatasource } from "./utils/createServerSideDatasource";
import { dataTypeDefinitions } from "./utils/dataTypeDefinitions";

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
  const gridRef = useRef<AgGridReact>(null);

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs] = useState(buildColumnDefs(configuration.columnDefs));
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      enableCellChangeFlash: true,
    };
  }, []);

  const sideBar = useMemo<SideBarDef>(() => {
    return {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          toolPanelParams: {
            suppressRowGroups: Boolean(columnDefs.find(col => col.enableRowGroup)),
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
          },
        },
      ],
    };
  }, [columnDefs]);

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
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Tabella AG Grid con dati configurabili</h1>
        <ColumnStateControls gridRef={gridRef} endPoint={configuration.endPoint} />
      </div>
      <div style={gridStyle}>
        <AgGridReact
          // client side data props
          loading={configuration.rowModelType === "clientSide" ? tableDataQuery.isLoading : undefined}
          rowData={configuration.rowModelType === "clientSide" ? tableDataQuery.data?.data : undefined}
          //server side data props
          onGridReady={configuration.rowModelType === "serverSide" ? onGridReady : undefined}
          serverSideEnableClientSideSort={configuration.rowModelType === "serverSide" ? true : undefined}
          cacheBlockSize={configuration.rowModelType === "serverSide" ? 50 : undefined}
          suppressServerSideFullWidthLoadingRow={configuration.rowModelType === "serverSide" ? true : undefined}
          // common props
          ref={gridRef}
          localeText={AG_GRID_LOCALE_IT}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          dataTypeDefinitions={dataTypeDefinitions}
          rowModelType={configuration.rowModelType}
          sideBar={sideBar}
          rowGroupPanelShow={columnDefs.find(col => col.enableRowGroup) ? "always" : "never"}
          pagination={configuration.pagination}
          paginationAutoPageSize={configuration.pagination}
          debug={true}
        />
      </div>
    </>
  );
}
