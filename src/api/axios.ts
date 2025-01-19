import { env } from "@/env/client";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
