import http from "../http-common";

class PartnerService {
    create(data) {
        console.log('PartnerService', data);
       return http.post("/createpartneraccount/", data);
    }

    getAll() {
        return http.get("/pets/1/");
    }
}

export default new PartnerService();