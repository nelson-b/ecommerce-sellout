import http from "../http-common";

class UserService {

  getAll() {
    return http.get("/prod/ecomm-sellout-dev-lamda-createpartner/get-userlist");
  }
}

export default new UserService();
