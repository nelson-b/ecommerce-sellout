import http from "../http-common";

class UserService {

  getAll(id, user) {
    return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=by_user_role&ROLE_ID=${id.toUpperCase()}&EMAIL_ID=${user}`);
    // https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/prod/ecomm-sellout-dev-lamda-createpartner/get-userlist?ROLE_ID=EDITOR
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
