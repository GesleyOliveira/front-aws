import axios from "axios";

const api = axios.create({
  baseURL: "http://54.146.126.47/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;