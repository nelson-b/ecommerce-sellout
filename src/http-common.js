import axios from "axios";

export default axios.create({
  baseURL: "https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com",
  headers: {
    "Content-type": "application/json",
    "Accept": "*/*"
  }
});