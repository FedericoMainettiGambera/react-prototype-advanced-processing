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

export default function Users() {
  const [tableState, setTableState] = useSubjectslogTableState();
  const usersDataQuery = useSubjectslogQuery(tableState);

  if (usersDataQuery.isLoading) {
    return <div>Caricamento...</div>;
  }

  if (usersDataQuery.isError) {
    return <div>Errore: {usersDataQuery.error.message}.</div>;
  }

  return (
    <>
      <GridComponent
        dataSource={usersDataQuery.data?.items || []}
        allowPaging={true}
        pageSettings={{
          pageSize: tableState.pagination.limit,
          currentPage: tableState.pagination.offset / tableState.pagination.limit + 1,
          totalRecordsCount: usersDataQuery.data?.count,
        }}
        allowFiltering={true}

        filterSettings={{
          columns: [
            {
              field: "name1",
              value: tableState.filters.name1 || "",
            },
            {
              field: "name2",
              value: tableState.filters.name2 || "",
            },
            {
              field: "gender",
              value: tableState.filters.gender || "",
            },
            {
              field: "birthdate",
              value: tableState.filters.birthdate || "",
            },
          ],
        }}
        
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
                offset: parseInt(currentPage) * prev.pagination.limit,
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
      <pre>{JSON.stringify(tableState, null, 2)}</pre>
    </>
  );
}
