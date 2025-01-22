// import { Ajax } from '@syncfusion/ej2-base';
// import { ColumnDirective, ColumnsDirective, DataResult, DataStateChangeEventArgs, Grid, GridComponent, Group, Inject, Page, Sort, Sorts } from '@syncfusion/ej2-react-grids';

// function CustomBinding() {
//   let grid: Grid;
//   let data;
//   const BASE_URL: string = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';

//   function rendereComplete() {
//     let state = { skip: 0, take: 10 };
//     dataStateChange(state);
//   }

//   function dataStateChange(state: DataStateChangeEventArgs) {
//     execute(state).then((gridData) => { grid.dataSource = gridData });
//   }

//   const ajax: Ajax = new Ajax({
//     type: 'GET', mode: true,
//     onFailure: (e: Error) => { return false; }
//   });

//   function execute(state: DataStateChangeEventArgs): Promise<DataResult> {
//     return getData(state);
//   }

//   function getData(state: DataStateChangeEventArgs): Promise<DataResult> {
//     const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
//     let sortQuery: string = '';

//     if ((state.sorted || []).length) {
//       sortQuery = `&$orderby=` + (state).sorted.map((obj: Sorts) => {
//         return obj.direction === 'descending' ? `${obj.name} desc` : obj.name;
//       }).reverse().join(',');
//     }

//     ajax.url = `${BASE_URL}?${pageQuery}${sortQuery}&$count=true`;

//     return ajax.send().then((response: any) => {
//       let data: any = JSON.parse(response);
//       return { result: data['value'], count: parseInt(data['@odata.count'], 10) };
//     });
//   }
//   return (
//     <div className='control-pane'>
//       <div className='control-section'>
//         <GridComponent dataSource={data} ref={g => grid = g} allowPaging={true} allowSorting={true} pageSettings={{ pageCount: 4, pageSize: 10 }} allowGrouping={true} dataStateChange={dataStateChange.bind(this)}>
//           <ColumnsDirective>
//             <ColumnDirective field='OrderID' headerText='Order ID' width='120' allowGrouping={false}></ColumnDirective>
//             <ColumnDirective field='CustomerID' headerText='Customer Name' width='150'></ColumnDirective>
//             <ColumnDirective field='ShipName' headerText='Ship Name' width='120' />
//             <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
//           </ColumnsDirective>
//           <Inject services={[Page, Group, Sort]} />
//         </GridComponent>
//       </div>
//     </div>
//   )
// }
// export default CustomBinding;