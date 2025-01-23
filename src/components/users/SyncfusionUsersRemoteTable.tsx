import { useSubjectslogQuery, useSubjectslogTableState } from "@/api/query/useSubjectslogQuery";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Inject,
  Page,
  type Action,
  type FilterEventArgs,
  type PageEventArgs,
} from "@syncfusion/ej2-react-grids";

export default function SyncfusionUsersRemoteTable() {
  const [tableState, setTableState] = useSubjectslogTableState();
  const usersDataQuery = useSubjectslogQuery(tableState);

  if (usersDataQuery.isError) {
    return <div>Errore: {usersDataQuery.error.message}.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-xl">Tabella Syncfusion con dati da remoto</h1>
      <div className="h-[700px]">
        <GridComponent
          dataSource={usersDataQuery.data?.items || []}
          allowPaging={true}
          pageSettings={{
            pageSize: tableState.pagination.limit,
            currentPage: tableState.pagination.offset / tableState.pagination.limit + 1,
            totalRecordsCount: usersDataQuery.data?.count || 0,
          }}
          allowFiltering={true}
          actionComplete={args => {
            const requestType: Action = args.requestType;

            console.log("actionBegin: ", requestType);

            if (requestType === "paging") {
              const currentPage = (args as PageEventArgs).currentPage;

              if (!currentPage) {
                return;
              }

              console.log("Pagin: ", currentPage);

              setTableState(prev => ({
                ...prev,
                pagination: {
                  ...prev.pagination,
                  offset: (parseInt(currentPage) - 1) * prev.pagination.limit,
                },
              }));
            }

            if (requestType === "filtering") {
              const filters = (args as FilterEventArgs).currentFilterObject;

              if (!filters) {
                return;
              }

              console.log("Filtering: ", filters.field, filters.value);

              setTableState(prev => ({
                ...prev,
                filters: {
                  name1: filters.field === "name1" ? (filters.value as string) : undefined,
                  name2: filters.field === "name2" ? (filters.value as string) : undefined,
                  gender: filters.field === "gender" ? (filters.value as string) : undefined,
                  birthdate: filters.field === "birthdate" ? (filters.value as string) : undefined,
                },
              }));
            }
          }}
        >
          <ColumnsDirective>
            <ColumnDirective field="name1" headerText="Nome" />
            <ColumnDirective field="name2" headerText="Cognome" />
            <ColumnDirective field="birthdate" headerText="Data di nascita" />
            <ColumnDirective field="gender" headerText="Sesso" />
          </ColumnsDirective>
          <Inject services={[Page, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
}
