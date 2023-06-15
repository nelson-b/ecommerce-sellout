import http from "../http-common";

class UserService {
  getAll() {
    return http.get("/ecomm-sellout-dev-lamda-createpartner/get-userlist");
  }

  createUpdateUserPartnerRoleConfig(data) {
    return http.post("/ecomm-sellout-dev-lamda-createpartner/create-user-role-partnerconfig", data);
  }

  getUserProfileById(id){
    return http.get(`/get/${id}`);
  }
}

export default new UserService();
