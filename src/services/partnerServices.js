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
    console.log(`baseUrl: https://8ghiehyd0f.execute-api.eu-west-1.amazonaws.com/create-partner/ecomm-sellout-dev-lamda-createpartner/get-partner-list?fetch=by_user&user=${user}&role_id=${id}`)
    return http.get(
      `/create-partner/ecomm-sellout-dev-lamda-createpartner/get-partner-list?fetch=by_user&user=${user}&role_id=${id}`
    );
  }

  get(id) {
    //return http.get(`/default/SamFunction?partner_id=${id}&country_code=MYS`);
    console.log('partnerid',id);
    return http.get(
      `/default/SamFunction?partner_id=${id}&country_code=MYS`
    ); //temp using partner list
  }

  update(data) {
    return http.put(
      `/ecomm-sellout-dev-lamda-createpartner/update-partner`,
      data
    );
  }
}

export default new PartnerService();
