import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/sellout",
  headers: {
    "Content-type": "application/json"
  }
});