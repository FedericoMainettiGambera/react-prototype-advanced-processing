import { type TableConfiguration } from "./mock/data/tableConfiguration";

export default function TableConfigurationViewer({ configuration }: { configuration: TableConfiguration }) {
  return (
    <div className="p-4 border rounded-md bg-muted flex flex-col gap-4">
      <b>Configurazione</b>
      <pre>{JSON.stringify(configuration, null, 2)}</pre>
    </div>
  );
}
