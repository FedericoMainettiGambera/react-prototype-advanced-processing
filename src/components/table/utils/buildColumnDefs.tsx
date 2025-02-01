import type { ColDef } from "ag-grid-community";
import { DateTime } from "luxon";
import type { ColumnDefinition } from "../types/ColumnDefinition";

const buildDateStringComparator = (format: string) => {
  const comparator = (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const cellDateAsString = cellValue;
    const luxonCellDate = DateTime.fromFormat(cellDateAsString, format).startOf("day");
    const luxonFilterDate = DateTime.fromJSDate(filterLocalDateAtMidnight).startOf("day");

    if (luxonCellDate < luxonFilterDate) {
      return -1;
    } else if (luxonCellDate > luxonFilterDate) {
      return 1;
    }
    return 0;
  };

  return comparator;
};

const buildFilterProps = (colDef: ColumnDefinition) => {
  let filterParams: ColDef["filterParams"] = undefined;
  let filter: ColDef["filter"] = undefined;

  if(!colDef.filtrable) {
    return { filter: undefined, filterParams: undefined, floatingFilter: false };
  }


  if (colDef.cellDataType === "text") {
    filter = "agTextColumnFilter";
    filterParams = {
      filterOptions: ["contains", "startsWith", "endsWith", "equals"],
      maxNumConditions: 1,
    };
  }

  if (colDef.cellDataType === "number") {
    filter = "agNumberColumnFilter";
    filterParams = {
      filterOptions: ["equals", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual"],
      maxNumConditions: 1,
    };
  }

  if (colDef.cellDataType === "date" || colDef.cellDataType === "dateString:dd/mm/yyyy") {
    filter = "agDateColumnFilter";
    filterParams = {
      filterOptions: ["equals", "greaterThan", "lessThan"],
      maxNumConditions: 1,
      comparator: colDef.cellDataType === "dateString:dd/mm/yyyy" ? buildDateStringComparator("dd/mm/yyyy") : undefined,
    };
  }

  return { filter, filterParams, floatingFilter: true };
};

// set up for getter and setter for custom data types

// const buildValueGetterAndSetter = (colDef: ColumnDefinition) => {
//   let valueGetter: ColDef["valueGetter"] = undefined;
//   let valueSetter: ColDef["valueSetter"] = undefined;

//     if (colDef.cellDataType === "dateString:dd/mm/yyyy") {
//       valueGetter = params => {
//       };
//       valueSetter = params => {
//       }
//     }

//   return { valueGetter, valueSetter };
// };

// set up for parser and formatter for custom data types

// const buildValueParserAndFormatter = (colDef: ColumnDefinition) => {
//   let valueParser: ColDef["valueParser"] = undefined;
//   let valueFormatter: ColDef["valueFormatter"] = undefined;
//   if (colDef.cellDataType === "dateString:dd/mm/yyyy") {
//     valueParser = params => {
//     };
//     valueFormatter = params => {
//     }
//   }
//   return { valueFormatter, valueParser };
// };

export const buildColumnDefs: (colDefs: ColumnDefinition[]) => ColDef[] = colDefs => {
  return colDefs.map(colDef => {
    const filterProps = buildFilterProps(colDef);

    // set up for custom data types
    // const valueGetterAndSetter = buildValueGetterAndSetter(colDef);
    // const valueParserAndFormatter = buildValueParserAndFormatter(colDef);

    return {
      field: colDef.field,
      colId: colDef.field,
      cellDataType: colDef.cellDataType,
      headerName: colDef.headerName,
      enableRowGroup: colDef.enableRowGroup,
      sortable: colDef.sortable,
      editable: colDef.editable,
      ...filterProps,
      // ...valueGetterAndSetter,
      // ...valueParserAndFormatter,
    };
  });
};
