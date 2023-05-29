import http from "../http-common";

class PartnerService {
    create(data) {
       return http.post("/createpartner/", data);
    }

    getAll() {
        return http.get("/default/SamFunction/");
    }
}

export default new PartnerService();