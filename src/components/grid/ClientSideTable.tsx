import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import type { ClientSideConfiguration } from "./mock/data/tableConfiguration";

export default function ClientSideTable({ configuration }: { configuration: ClientSideConfiguration }) {
  const [columnDefs, setColumnDefs] = useState(configuration.columnDefs);

  return <AgGridReact columnDefs={columnDefs} rowModelType={configuration.rowModelType} debug={true} />;
}
