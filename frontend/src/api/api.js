import axios from "axios";

const api = axios.create({
  baseURL: "https://wsp-fullstack-assignment.onrender.com/api",
});

export default api;