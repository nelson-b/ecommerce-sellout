import http from "../http-common";

class UserService {
  getAll(id, user) {
    return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=all`);
  }
  
  getByUserRole(id) {
    return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=by_role&ROLE_ID=${id.toUpperCase()}`);
  }

  createPartnerUserRoleConfig(data) {
    return http.post("/ecomm-sellout-dev-lamda-createpartner/create-user-role-partnerconfig", data);
  }

  createUserProfile(data){
    return http.post("/ecomm-sellout-dev-lamda-createpartner/create-user-profile", data);
  }
  
  getByRole(id) {
    return http.get(`/prod/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=by_role&ROLE_ID=${id.toUpperCase()}`);
  }
}

export default new UserService();
