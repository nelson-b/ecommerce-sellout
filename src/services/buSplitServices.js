import http from "../http-common";

class BuSplitServices {

  getBuSplit(user, id, year) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get_sellout_bu_split?fetch=by_user&user=${user}&role_id=${id}&year_val=${year}`
    );
  }

  getPartnerName(partnerId, countyCode) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get-partner-by-partnerid-countrycode?partner_id=${partnerId}&country_code=${countyCode}`
    );
  }

  updateBuSplit(data) {
    return http.post(
      `/ecomm-sellout-dev-lamda-createpartner/upsert-sellout-bu-split`,data
    );
  }
}

export default new BuSplitServices();
