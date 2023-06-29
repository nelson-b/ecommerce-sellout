import http from "../http-common";

class DataInputService {
    create(data) {
        return http.post("/ecomm-sellout-dev-lamda-createpartner/create-update-input-calander/create-sellout-transactions", data);
    }

    update(data) {
        return http.put(`/ecomm-sellout-dev-lamda-createpartner/update-sellout-data`, data);
    }

    getAll(user, year, role) {
        return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-sellout-data-input?USER=${user}&YEAR_VAL=${year}&ROLE_ID=${role}&fetch=by_user_role`);
    }

    updateReviewData(data) {
        return http.post(`/ecomm-sellout-dev-lamda-createpartner/create-update-input-calander/create-sellout-transactions`, data);
    }
}

export default new DataInputService();