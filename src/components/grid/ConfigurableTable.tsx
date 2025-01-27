import ClientSideTable from "./ClientSideTable";
import type { TableConfiguration } from "./mock/data/tableConfiguration";
import ServerSideTable from "./ServerSideTable";

export default function ConfigurableTable({ configuration }: { configuration: TableConfiguration }) {
  if (configuration.rowModelType === "serverSide") {
    return <ServerSideTable configuration={configuration} />;
  }

  return <ClientSideTable configuration={configuration} />;
}
