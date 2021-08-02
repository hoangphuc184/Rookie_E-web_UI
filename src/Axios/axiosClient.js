import axios from "axios";

const jwtToken = localStorage.getItem("jwtToken") || "";
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `${jwtToken}`,
    "Content-Type": "application/json",
  },
});

export default axiosClient;
