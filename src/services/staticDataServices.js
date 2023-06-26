import http from "../http-common";

class StaticDataService {
    getAllCountries() {
        return http.get("/ecomm-sellout-dev-lamda-createpartner/get-geography?country_code=ALL");
    }

    getAllStaticDataList(){
        return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-geography?country_code=refall`);
    }

    getStaticDataByAttrName(attr_name){
        return http.get((`/ecomm-sellout-dev-lamda-createpartner/getpartner-account-ref?ATTRIBUTE_NAME=`).concat(attr_name));
    }
}

export default new StaticDataService();