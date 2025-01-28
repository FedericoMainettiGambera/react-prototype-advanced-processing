import type { IServerSideGetRowsRequest } from "ag-grid-community";
import { tableMockData, type TableData } from "./data/tableData";

type FetchResponse = {
  data: TableData[];
  totalRows: number;
};

export const fetchRequestedData: (input: { request: IServerSideGetRowsRequest; endPoint: string }) => Promise<FetchResponse> = async ({
  request,
  endPoint,
}) => {
  const { startRow, endRow, sortModel, filterModel, rowGroupCols, groupKeys = [] } = request;

  let processedData = [...tableMockData].filter(row => {
    if (!filterModel || Object.keys(filterModel).length === 0) {
      return true;
    }

    return Object.entries(filterModel).every(([colId, filterConfig]) => {
      const value = String(row[colId as keyof typeof row]).toLowerCase();
      const filter = (filterConfig as { filter: string }).filter.toLowerCase();

      switch ((filterConfig as { type: string }).type) {
        case "contains":
          return value.includes(filter);
        case "startsWith":
          return value.startsWith(filter);
        default:
          return true;
      }
    });
  });

  if (groupKeys.length > 0) {
    groupKeys.forEach((groupKey, index) => {
      const groupField = rowGroupCols[index].field;
      if (groupField) {
        processedData = processedData.filter(row => String(row[groupField as keyof typeof row]) === groupKey);
      }
    });
  }

  const isDoingGrouping = rowGroupCols.length > groupKeys.length;

  if (isDoingGrouping) {
    const currentGroupLevel = groupKeys.length;
    const currentGroupField = rowGroupCols[currentGroupLevel].field;

    if (currentGroupField) {
      const groupedData = processedData.reduce<Record<string, TableData[]>>((acc, row) => {
        const groupValue = String(row[currentGroupField as keyof typeof row]);
        if (!acc[groupValue]) {
          acc[groupValue] = [];
        }
        acc[groupValue].push(row);
        return acc;
      }, {});

      // Create parent groups with inherited group values
      const parentGroups = rowGroupCols
        .slice(0, currentGroupLevel)
        .map((col, index) => [col.field, groupKeys[index]]);

      processedData = Object.entries(groupedData).map(([groupValue, rows]) => ({
        ...Object.fromEntries(parentGroups),
        [currentGroupField]: groupValue,
        childCount: rows.length,
      })) as unknown as TableData[];
    }
  }

  const sortedData = [...processedData].sort((a, b) => {
    for (const { colId, sort } of sortModel) {
      const valueA = String(a[colId as keyof typeof a]);
      const valueB = String(b[colId as keyof typeof b]);

      if (valueA !== valueB) {
        return sort === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    }
    return 0;
  });

  const totalRows = sortedData.length;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: sortedData.slice(startRow, endRow),
        totalRows,
      });
    }, 500);
  });
};
