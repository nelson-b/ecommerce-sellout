import axios from "axios";

export default axios.create({
  baseURL: "https://umy9pvcura.execute-api.eu-west-1.amazonaws.com/vpet",
  headers: {
    "Content-type": "application/json",
    "Accept": "*/*",
    "Access-Control-Allow-Headers" : 
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods" : "OPTIONS,POST,GET,PUT,DELETE",
    "Access-Control-Allow-Credentials" : true,
    "Access-Control-Allow-Origin" : "*",
    "X-Requested-With" : "*"
  }
});