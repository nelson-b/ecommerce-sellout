import http from "../http-common";

class PartnerService {
  create(data) {
    console.log("PartnerService", data);
    return http.post("/ecomm-sellout-dev-lamda-createpartner", data);
  }

  getAll() {
    return http.get("/create-partner/ecomm-sellout-dev-lamda-createpartner/get-partner-list");
  }
}

export default new PartnerService();
