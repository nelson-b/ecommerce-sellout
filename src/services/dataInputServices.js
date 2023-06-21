import http from "../http-common";
import baseurl from "../http-baseUrl";

class DataInputService {
    create(data) {
        return http.post("/ecomm-sellout-dev-lamda-createpartner/create-update-input-calander/create-sellout-transactions", data);
    }

    update(data) {
        return http.put(`/ecomm-sellout-dev-lamda-createpartner/update-sellout-data`, data);
    }

    getAll(user, year, role) {
        return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-sellout-data-input?USER=${user}&YEAR_VAL=${year}&ROLE_ID=${role}`);
    }

    updateReviewData(data) {
        console.log('data in service', data);
        return baseurl.post(`/create-partner/ecomm-sellout-dev-lamda-createpartner/create-update-input-calander/create-sellout-transactions`, data);
        // https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/create-partner/ecomm-sellout-dev-lamda-createpartner/create-update-input-calander/create-sellout-transactions
    }
}

export default new DataInputService();