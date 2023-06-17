import http from "../http-common";

class PartnerService {
  create(data) {
    console.log("PartnerService", data);
    return http.post("/ecomm-sellout-dev-lamda-createpartner/create-partner", data);
  }

  getAll() {
    return http.get(
      "/ecomm-sellout-dev-lamda-createpartner/get-partner-list" 
    );
  }

  getByRole(id, user) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get-partner-list?fetch=by_user&user=${user}&role_id=${id}`
    );
  }

  getUserRoleConfigByPartnerId(id) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get-user-role-partner-config?fetch=by_partner_id&partner_id=${id}`
    );
  }

  getAllUserRoleConfig() {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get-user-role-partner-config?fetch=all`
    );
  }

  getUserRoleConfigByPartnerId(id) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get-user-role-partner-config?fetch=by_partner_id&partner_id=${id}`
    );
  }

  getUserRoleConfigByEmailRole(id, role) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get-user-role-partner-config?fetch=by_email_role&email_id=${id}&role_id=${role.toUpperCase()}`
    );
  }

  get(id) {
    console.log('partnerid',id);
    return http.get(
      `/default/SamFunction?partner_id=${id}&country_code=MYS`
    ); 
  }

  update(data) {
    return http.put(
      `/ecomm-sellout-dev-lamda-createpartner/update-partner`,
      data
    );
  }
}

export default new PartnerService();