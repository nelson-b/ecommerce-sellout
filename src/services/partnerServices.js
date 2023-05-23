import http from "../http-common";

class PartnerService {
    create(data) {
       return http.post("/createpartner/", data);
    }

    getAll() {
        return http.get("/getpartnerlist/");
    }
}

export default new PartnerService();