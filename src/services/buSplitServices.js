import http from "../http-common";

class BuSplitServices {

  getBuSplit(user, id, year) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get_sellout_bu_split?fetch=by_user&user=${user}&role_id=${id}&year_val=${year}`
    );
  }

  updateBuSplit(data) {
    console.log('daat in service', data);
    return http.post(
      `/ecomm-sellout-dev-lamda-createpartner/upsert-sellout-bu-split`,data
    );
  }
}

export default new BuSplitServices();
