import http from "../http-common";

class SellOutDataService {
  getAll(user, year, id) {
    return http.get(
      `prod/ecomm-sellout-dev-lamda-createpartner/get-sellout-data-input?USER=${user}&YEAR_VAL=${year}&ROLE_ID=${id}`
      // https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/prod/ecomm-sellout-dev-lamda-createpartner/get-sellout-data-input?USER="mno@example.com"&YEAR_VAL=2023&ROLE_ID="supervisor_approv_1_2"
    );
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