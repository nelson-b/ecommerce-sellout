import http from "../http-common";

class UserService {
  getAll(id) {
    return http.get(`/prod/ecomm-sellout-dev-lamda-createpartner/get-userlist?ROLE_ID=${id.toUpperCase()}`);
  }

  createPartnerUserRoleConfig(data) {
    return http.post("/prod/ecomm-sellout-dev-lamda-createpartner/create-user-role-partnerconfig", data);
  }
}

export default new UserService();
