import axios from "axios";

// const BASE_URL = "https://mdm.ai.multipliersolutions.in/api";
const BASE_URL = "http://localhost:5000/api";
// const BASE_URL = "http://192.168.0.196:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
