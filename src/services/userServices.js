import http from "../http-common";

class UserService {
  getAll(id) {
    return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=by_role&ROLE_ID=${id.toUpperCase()}`);
  }

  createPartnerUserRoleConfig(data) {
    return http.post("/ecomm-sellout-dev-lamda-createpartner/create-user-role-partnerconfig", data);
  }
}

export default new UserService();
