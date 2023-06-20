import http from "../http-common";

class dataReviewServices {

  getQuarterData(user, id, year, month) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get-previous-quarter-data-review?USER=${user}&ROLE_ID=${id}&YEAR_VAL=${year}&MONTH_VAL=${month}`
    );
  }
}

export default new dataReviewServices();
