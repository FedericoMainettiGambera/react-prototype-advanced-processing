import { env } from "@/env/client";
import axios from "axios";

type Response = {
  data: any[];
};

export const fetchData = async (endPoint: string): Promise<Response> => {
  const baseUrl = env.VITE_BASE_API_URL.replace(/\/$/, ""); // Remove trailing slash if present
  const fullUrl = `${baseUrl}/${endPoint.replace(/^\//, "")}`; // Remove leading slash from endpoint

  const response = await axios.get(fullUrl);

  // Add artificial delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  return { data: response.data.rows } as Response;
};
