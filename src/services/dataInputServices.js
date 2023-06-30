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
    getQuarter(user, role, year, month) {
        return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-previous-quarter-data-review?USER=${user}&ROLE_ID=${role}&YEAR_VAL=${year}&MONTH_VAL=${JSON.stringify(month)}`);
    }
    getNotifications(email, role) {
        return http.get(`/ecomm-sellout-dev-lamda-createpartner/pop-up-notification-get-api-query-parameters:?email=${email}&role=${role}`);
    }
}

export default new DataInputService();