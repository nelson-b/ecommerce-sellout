import http from "../http-common";

class PartnerService {
    create(data) {
        console.log('PartnerService', data);
       return http.post("/ecomm-sellout-dev-lamda-createpartner", data);
    }

    getAll() {
        return http.get("/create-partner/ecomm-sellout-dev-lamda-createpartner/get-partner-list");
    }

    get(id) {
        //return http.get(`/default/SamFunction?partner_id=${id}&country_code=MYS`);
        return http.get('/create-partner/ecomm-sellout-dev-lamda-createpartner/get-partner-list'); //temp using partner list
    }

    update(data) {
        return http.put(`/ecomm-sellout-dev-lamda-createpartner/update-partner`, data);
    }
}

export default new PartnerService();