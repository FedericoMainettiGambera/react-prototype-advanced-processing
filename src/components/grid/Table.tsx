import { AgGridReact } from "ag-grid-react";
import type { TableConfiguration } from "./mock/data/tableConfiguration";

export default function Table({ configuration }: { configuration: TableConfiguration }) {
  return <AgGridReact />;
}
