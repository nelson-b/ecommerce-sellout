import axios from "axios";

export default axios.create({
  baseURL: "https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/prod",
  headers: {
    "Content-type": "application/json",
    "Authentication": 'Bearer ps/vVxpEiRZefFMC3nHg3xjwirrQQZR27+h9V5qs/Rg231VYZyY3tkEjxFMvajcjZhLK9b1zE/YSDmBIny12VCBUfEVNWGphn0IUY6QQb19ZibAyib0zhcbtAeSL',
    // "headerauth1": "allow"
    // "Accept": "*/*",
     "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
     "X-Api-Key": "",
    // "Access-Control-Allow-Methods" : "OPTIONS,POST,GET,PUT,DELETE",
    // "Access-Control-Allow-Credentials" : true,
    // "Access-Control-Allow-Origin" : "*",
    // "X-Requested-With" : "*",
    //  "headerAuth1": "allow"
    //"AWSALBCORS":"ps/vVxpEiRZefFMC3nHg3xjwirrQQZR27+h9V5qs/Rg231VYZyY3tkEjxFMvajcjZhLK9b1zE/YSDmBIny12VCBUfEVNWGphn0IUY6QQb19ZibAyib0zhcbtAeSL; Expires=Tue, 13 Jun 2023 06:58:36 GMT; Path=/; SameSite=None; Secure"
  }
});