import axios from "axios";

export const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const apiClient = axios.create({
  baseURL: MEDUSA_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 6000,
});
