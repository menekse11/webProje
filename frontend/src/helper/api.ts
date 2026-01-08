import axios from "axios";
const baseURL = import.meta.env.PROD
  ? "https://RAILWAY-URL-BURAYA.up.railway.app/"
  : "http://localhost:3000/";

export const api = axios.create({
  baseURL,
});

export function setToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
