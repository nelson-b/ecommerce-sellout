import http from "../http-common";

class PartnerService {
    create(data) {
       return http.post("/createpartner/", data);
    }
}

export default new PartnerService();