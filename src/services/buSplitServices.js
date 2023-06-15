import http from "../http-common";

class BuSplitServices {

  getAll() {
    return http.get(
      "/create-partner/ecomm-sellout-dev-lamda-createpartner/get_sellout_bu_split"
    );
  }

  update(data) {
    return http.put(
      `/create-partner/ecomm-sellout-dev-lamda-createpartner/upsert-sellout-bu-split`,data
    );
  }
}

export default new BuSplitServices();
