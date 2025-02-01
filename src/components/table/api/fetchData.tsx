import { env } from "@/env/client";
import axios from "axios";

type Response = {
  data: any[];
};

// fetch data for table client-side mode
export const fetchData = async (endPoint: string): Promise<Response> => {
  try {
    const baseUrl = env.VITE_BASE_TABLE_API_URL.replace(/\/$/, ""); // Remove trailing slash if present
    const fullUrl = `${baseUrl}/${endPoint.replace(/^\//, "")}`; // Remove leading slash from endpoint

    const response = await axios.get(fullUrl);

    return { data: response.data.rows } as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch data');
    } else {
      console.error('Unexpected Error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};
