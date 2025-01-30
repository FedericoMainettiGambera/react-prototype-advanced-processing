import type { DataTypeDefinition, ValueFormatterLiteParams, ValueParserLiteParams } from "ag-grid-community";
import { DateTime } from "luxon";
import type { CustomDataType } from "../types/CellDataType";

export const dataTypeDefinitions: {
  [key in CustomDataType]: DataTypeDefinition;
} = {
  "dateString:dd/mm/yyyy": {
    baseDataType: "dateString",
    extendsDataType: "dateString",
    valueParser: (params: ValueParserLiteParams<any, string>) =>
      params.newValue != null && params.newValue.match("\\d{2}/\\d{2}/\\d{4}") ? params.newValue : null,
    valueFormatter: (params: ValueFormatterLiteParams<any, string>) => {
      return params.value == null ? "" : DateTime.fromFormat(params.value, "dd/mm/yyyy").toLocaleString(DateTime.DATE_FULL);
    },
    dataTypeMatcher: (value: any) => typeof value === "string" && !!value.match("\\d{2}/\\d{2}/\\d{4}"),
    dateParser: (value: string | undefined) => {
      if (value == null || value === "") {
        return undefined;
      }
      const dateParts = value.split("/");
      return dateParts.length === 3 ? new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0])) : undefined;
    },
    dateFormatter: (value: Date | undefined) => {
      if (value == null) {
        return undefined;
      }
      const date = String(value.getDate());
      const month = String(value.getMonth() + 1);
      return `${date.length === 1 ? "0" + date : date}/${month.length === 1 ? "0" + month : month}/${value.getFullYear()}`;
    },
  },
};
