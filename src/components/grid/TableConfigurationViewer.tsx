import { type TableConfiguration } from "./mock/data/tableConfiguration";

export default function TableConfigurationViewer({ configuration }: { configuration: TableConfiguration }) {
  return <pre>{JSON.stringify(configuration, null, 2)}</pre>;
}
