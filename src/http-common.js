import axios from "axios";

export default axios.create({
  baseURL: "https://hg8f031p60.execute-api.eu-west-1.amazonaws.com/",
  headers: {
    "Content-type": "application/json",
    "Accept": "*/*",
    "Allow-Control-Allow-Credentials": "true"
  }
});