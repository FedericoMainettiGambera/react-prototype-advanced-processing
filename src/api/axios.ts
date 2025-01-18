import { env } from "@/env/client";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `https://cors-anywhere.herokuapp.com/${env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});