import { useLocalUsersData } from "@/api/query/useLocalUsersData";
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Inject, Page } from "@syncfusion/ej2-react-grids";

export default function SyncfusionUsersLocalTable() {
  const localUsersData = useLocalUsersData();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-semibold text-xl">Tabella Syncfusion con dati in locale</h1>
      <div className="h-[700px]">
        <GridComponent dataSource={localUsersData} allowPaging={true} allowFiltering={true}>
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
