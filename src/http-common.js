import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    "Accept": "*/*",
    "Authorization": Cookies.get('token')
  }
});