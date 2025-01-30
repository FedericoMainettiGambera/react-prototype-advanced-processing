import ConfigurableTable from "@/components/table/ConfigurableTable";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <ConfigurableTable configurationEndPoint="api/table-configurations/example" />
    </div>
  );
}
