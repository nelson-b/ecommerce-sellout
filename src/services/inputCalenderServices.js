import http from "../http-common";

class InputCalenderService {
  getPreviousQuarterDetails(YEAR_VAL, MONTH_QUARTER_VAL, ROLE_ID) {
    return http.get(
      `/ecomm-sellout-dev-lamda-createpartner/get-input-calendar-ref?YEAR_VAL=${YEAR_VAL}&MONTH_QUARTER_VAL=${MONTH_QUARTER_VAL}&ROLE_ID=${ROLE_ID}`
    );
  }

  createQuarterData(data) {
    return http.post(
      `/ecomm-sellout-dev-lamda-createpartner/create-update-input-calander`,
      data
    );
  }
}

export default new InputCalenderService();
