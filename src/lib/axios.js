import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const http = axios.create({
  baseURL: "https://abdelaal-nest.vercel.app",
  // baseURL: "http://localhost:3000",
  // headers: { Authorization: `Bearer ${cookies.get("token")}` },
  headers: { secret: "abdelaalistop" },
});

export default http;
