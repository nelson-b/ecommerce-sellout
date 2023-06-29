import http from "../http-common";

class SellOutDataService {
  getHistoricalData(user, year, id) {
    debugger;
    let isSuperApproverUser = " ";
    if (id == "supervisor_approv_1_2") {
      isSuperApproverUser = `/ecomm-sellout-dev-lamda-createpartner/get-sellout-data-input?fetch=all`;
    } else {
      isSuperApproverUser = `/ecomm-sellout-dev-lamda-createpartner/get-sellout-data-input?USER=${user}&YEAR_VAL=${year}&ROLE_ID=${id}&fetch=by_user_role`;
    }
    return http.get(isSuperApproverUser);
  }

  getAll() {
    return http.get("/getAll");
  }

  get(id) {
    return http.get(`/get/${id}`);
  }

  create(data) {
    return http.post("/add", data);
  }

  update(id, data) {
    return http.put(`/update/${id}`, data);
  }

  delete(id) {
    return http.delete(`/delete/${id}`);
  }

  deleteAll() {
    return http.delete("/deleteAll");
  }
}

export default new SellOutDataService();
