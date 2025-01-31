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

export const buildColumnDefs: (colDefs: ColumnDefinition[]) => ColDef[] = colDefs => {
  return colDefs.map(colDef => {
    let filterParams: ColDef["filterParams"] = undefined;
    let filter: ColDef["filter"] = undefined;

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

    return {
      field: colDef.field,
      colId: colDef.field,
      cellDataType: colDef.cellDataType,
      headerName: colDef.headerName,
      enableRowGroup: colDef.enableRowGroup,
      sortable: colDef.sortable,
      filter: colDef.filter,
      floatingFilter: colDef.filter,
      filterParams: filterParams,
    };
  });
};
