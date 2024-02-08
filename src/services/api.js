import axios from "axios";
export const BASE_URL = "https://api.npoint.io/4829d4ab0e96bfab50e7";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
