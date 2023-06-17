import http from "../http-common";

class DataInputService {
    create(data) {
        return http.post("/create-partner/ecomm-sellout-dev-lamda-createpartner/update-sellout-data", data);
    }

    update(data) {
        return http.put(`/create-partner/ecomm-sellout-dev-lamda-createpartner/update-sellout-data`, data);
    }

    getAll() {
        return http.get("/create-partner/ecomm-sellout-dev-lamda-createpartner/get-sellout-data-input");
    }
}

export default new DataInputService();