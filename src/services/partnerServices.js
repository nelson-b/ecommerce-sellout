import http from "../http-common";

class PartnerService {
    create(data) {
       return http.post("/ecomm-sellout-dev-lamda-createpartner", data);
    }

    getAll() {
        return http.get("/default/SamFunction/");
    }
}

export default new PartnerService();