import { useSubjectslogQuery, useSubjectslogTableState, type User } from "@/api/query/useSubjectslogQuery";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

export default function AgGridUsersRemoteTable() {
  const [tableState, setTableState] = useSubjectslogTableState();
  const usersDataQuery = useSubjectslogQuery(tableState);

  const [columnDefs] = useState<ColDef<User>[]>([
    { field: "name1", filter: true },
    { field: "name2", filter: true },
    { field: "birthdate" },
    { field: "gender" },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-xl">Tabella AG Grid con dati da remoto</h1>
      <div className="h-[700px]">
        <AgGridReact
          rowData={usersDataQuery.data?.items}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
          }}
          loading={usersDataQuery.isLoading}
          pagination={true}
          paginationPageSize={tableState.pagination.limit}
          paginationPageSizeSelector={false}
          onPaginationChanged={params => {
            if (params.api.paginationGetCurrentPage() !== null) {
              const currentPage = params.api.paginationGetCurrentPage(); // Starts from 0
              const pageSize = params.api.paginationGetPageSize();

              setTableState(prevState => ({
                ...prevState,
                pagination: {
                  limit: pageSize,
                  offset: currentPage * pageSize,
                },
              }));
            }
          }}
          onFilterChanged={params => {
            const appliedFilters = params.api.getFilterModel();
            const newFilters = {
              name1: appliedFilters.name1?.filter || "",
              name2: appliedFilters.name2?.filter || "",
              birthdate: appliedFilters.birthdate?.filter || "",
              gender: appliedFilters.gender?.filter || "",
            };

            setTableState(prevState => ({
              ...prevState,
              filters: newFilters,
            }));
          }}
        />
      </div>
    </div>
  );
}
