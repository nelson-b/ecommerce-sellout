import http from "../http-common";
var setValueForPartner = [];
var setValueForCountry = [];
class DataReviewService {

  getValueForPartnerFunc() {
    return setValueForPartner
  }

  setValueForPartnerFunc(val) {
    setValueForPartner = val;    
    console.log('setValueForPartner::::', setValueForPartner);
  }

  getValueForCountryFunc() {
    return setValueForCountry
  }

  setValueForCountryFunc(val) {
    setValueForCountry = val;    
  }
}

export default new DataReviewService();
