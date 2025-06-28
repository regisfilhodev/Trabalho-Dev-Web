import axios from "axios";

const endpoint = import.meta.env.VITE_APP_ENDPOINT;

export const api = axios.create({
  baseURL: `${endpoint}`,
});
