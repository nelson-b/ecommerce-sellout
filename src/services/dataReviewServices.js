import http from "../http-common";
var setValueForPartner = [];
var setValueForCountry = [];
var selectedCountryData = [];
var selectedModelData = [];
var selectedZone;

class DataReviewService {

  getValueForPartnerFunc() {
    return setValueForPartner
  }
  setValueForPartnerFunc(val) {
    setValueForPartner = val;    
  }
  getValueForCountryFunc() {
    return setValueForCountry
  }
  setValueForCountryFunc(val) {
    setValueForCountry = val;    
  }

  setSelectedCountry(data) {
    selectedCountryData=data;
  }
  setSelectedModel(data) {
    selectedModelData=data;
  }
  setSelectedZone(data) {
    selectedZone=data;
  }

  getSelectedCountry() {
   return selectedCountryData;
  }
  getSelectedModel() {
    return selectedModelData;
  }
  getSelectedZone() {
    return selectedZone;
  }
}

export default new DataReviewService();
