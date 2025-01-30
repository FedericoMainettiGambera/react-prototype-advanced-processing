import { env } from "@/env/client";
import type { IServerSideGetRowsRequest } from "ag-grid-community";
import axios from "axios";

type Response = {
  rows: any[];
  lastRow: number;
};

export const fetchServerSideData = async ({ endPoint, request }: { endPoint: string; request: IServerSideGetRowsRequest }) => {
  const baseUrl = env.VITE_BASE_API_URL.replace(/\/$/, ""); // Remove trailing slash if present
  const fullUrl = `${baseUrl}/${endPoint.replace(/^\//, "")}`; // Remove leading slash from endpoint

  const { data } = await axios.post(fullUrl, request, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add artificial delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    rows: data.rows,
    lastRow: data.lastRow,
  } as Response;
};
