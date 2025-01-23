import { useLocalUsersData } from "@/api/query/useLocalUsersData";
import { type User } from "@/api/query/useSubjectslogQuery";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

export default function AgGridUsersLocalTable() {
  const localUsersData = useLocalUsersData();

  const [columnDefs] = useState<ColDef<User>[]>([
    { field: "name1", filter: true },
    { field: "name2", filter: true },
    { field: "birthdate" },
    { field: "gender" },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-xl">Tabella AG Grid con dati in locale</h1>
      <div className="h-[700px]">
        <AgGridReact
          rowData={localUsersData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
          }}
          pagination={true}
        />
      </div>
    </div>
  );
}
