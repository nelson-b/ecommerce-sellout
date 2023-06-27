import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: 'https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/prod',//process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    "Accept": "*/*",
    "Authorization": Cookies.get('token')
  }
});