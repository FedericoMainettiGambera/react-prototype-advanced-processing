import { env } from "@/env/client";
import type { IServerSideGetRowsRequest } from "ag-grid-community";
import axios from "axios";

type Response = {
  rows: any[];
  lastRow: number;
};

// fetch server-side data for table server-side mode
export const fetchServerSideData = async ({ endPoint, request }: { endPoint: string; request: IServerSideGetRowsRequest }) => {
  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch data from server');
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
