import http from "../http-common";

class UserService {
  getAll(id, user) {
    return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=all`);
  }
  
  getByUserEmailId(id){
    return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=by_user&EMAIL_ID=${id}`);
  }
  
  getByUserRole(id) {
    if(id){
      return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=by_role&ROLE_ID=${id.toUpperCase()}`);
    }
    else {
      return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=all`);
    }
  }

  createPartnerUserRoleConfig(data) {
    return http.post("/ecomm-sellout-dev-lamda-createpartner/create-user-role-partnerconfig", data);
  }

  createUserProfile(data){
    return http.post("/ecomm-sellout-dev-lamda-createpartner/create-user-profile", data);
  }
  
  getByRole(id) {
    return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-userlist?fetch=by_role&ROLE_ID=${id.toUpperCase()}`);
  }

  //sso login
  getClientId(){
    return http.get(`/`);
  }
}

export default new UserService();
