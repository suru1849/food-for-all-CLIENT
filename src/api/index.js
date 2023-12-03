import axios from "axios";

// axiosSecure
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
