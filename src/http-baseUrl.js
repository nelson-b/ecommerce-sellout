import axios from "axios";

export default axios.create({
  baseURL: "https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/",
//   https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/create-partner/ecomm-sellout-dev-lamda-createpartner/create-update-input-calander/create-sellout-transactions
  headers: {
    "Content-type": "application/json",
    "Accept": "*/*"
  }
});