import { useTableConfigurationQuery } from "@/components/grid/mock/useTableConfigurationQuery";
import Table from "@/components/grid/Table";
import TableConfigurationViewer from "@/components/grid/TableConfigurationViewer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/table")({
  component: RouteComponent,
});

function RouteComponent() {
  const tableConfigurationQuery = useTableConfigurationQuery();

  if (tableConfigurationQuery.isLoading) {
    return <div>Caricamento...</div>;
  }

  if (tableConfigurationQuery.isError) {
    return <div>Errore: {tableConfigurationQuery.error.message}</div>;
  }

  if (!tableConfigurationQuery.isSuccess) {
    return <div>Qualcosa è andato storto durante il caricamento della configuratione della tabella</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-xl">Tabella AG Grid con dati configurabili</h1>
      <div className="h-[700px]">
        <Table configuration={tableConfigurationQuery.data} />
      </div>
      <TableConfigurationViewer configuration={tableConfigurationQuery.data} />
    </div>
  );
}
