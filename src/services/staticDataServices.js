import http from "../http-common";

class StaticDataService {
    getAllCountries() {
        return http.get("/ecomm-sellout-dev-lamda-createpartner/get-geography?country_code=ALL");
    }

    getAllStaticDataList(){
        return http.get(`/ecomm-sellout-dev-lamda-createpartner/getpartner-account-ref`);
    }
}

export default new StaticDataService();