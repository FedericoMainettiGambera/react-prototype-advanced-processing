import type { IServerSideDatasource } from "ag-grid-community";
import { fetchServerSideData } from "../api/fetchServerSideData";

export const createServerSideDatasource: (input: { endPoint: string }) => IServerSideDatasource = ({ endPoint }) => {
  return {
    getRows: async params => {
      try {
        const requestedData = await fetchServerSideData({
          endPoint: endPoint,
          request: params.request,
        });
        params.success({ rowData: requestedData.rows, rowCount: requestedData.lastRow });
      } catch (e) {
        params.fail();
      }
    },
  };
};
