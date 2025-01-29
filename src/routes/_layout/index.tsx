import ConfigurableTable from "@/components/table/ConfigurableTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-xl">Tabella AG Grid con dati configurabili</h1>
      <div className="h-[700px]">
        <ConfigurableTable configurationEndPoint="api/table-configurations/example" />
      </div>
    </div>
  );
}
