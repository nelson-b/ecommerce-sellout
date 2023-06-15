import http from "../http-common";

class UserService {

  getAll(id) {
    return http.get(`/prod/ecomm-sellout-dev-lamda-createpartner/get-userlist?ROLE_ID=${id.toUpperCase()}`);
    // https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/prod/ecomm-sellout-dev-lamda-createpartner/get-userlist?ROLE_ID=EDITOR
  }
}

export default new UserService();
