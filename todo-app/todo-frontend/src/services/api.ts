import axios from "axios";

import Config from "../config";

const api = axios.create({
  baseURL: Config.SERVER_URL.DEV,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
