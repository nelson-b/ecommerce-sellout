import axios from "axios";

export default axios.create({
  baseURL: "https://eoa01d6g1c.execute-api.eu-west-1.amazonaws.com",
  headers: {
    "Content-type": "application/json"
  }
});