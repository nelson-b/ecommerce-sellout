import axios from "axios";

export default axios.create({
  baseURL: "https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/prod",
  headers: {
    "Content-type": "application/json",
    // "Authorization": "Bearer 00035A5XcEsYKLogbzSI2tsvZbMw",
    //"headerauth1": "allow"
    "Accept": "*/*",
    // "Access-Control-Allow-Headers": "Content-Type",
    // "X-Api-Key": "ZKv6Ah97A15ZMKuoeAzmL39Nlj1kwJvz4V74JM35", 
    //"X-Amz-Security-Token": ""
    //"X-Amz-Date: ""
    //"Authorization": ""
    //"X-Amz-Security-Token": ""
    // "Access-Control-Allow-Methods" : "OPTIONS,POST,GET,PUT,DELETE",
    // "Access-Control-Allow-Credentials" : true,
    // "Access-Control-Allow-Origin" : "*",
    // "X-Requested-With" : "*",
    // "allowedHeaders": ['sessionId', 'Content-Type'],
    //'exposedHeaders': ['sessionId'],
    //'origin': '*',
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    // "preflightContinue": true,
    // "headerauth1":"allow"
    //"AWSALBCORS":"ps/vVxpEiRZefFMC3nHg3xjwirrQQZR27+h9V5qs/Rg231VYZyY3tkEjxFMvajcjZhLK9b1zE/YSDmBIny12VCBUfEVNWGphn0IUY6QQb19ZibAyib0zhcbtAeSL; Expires=Tue, 13 Jun 2023 06:58:36 GMT; Path=/; SameSite=None; Secure"
  }
});