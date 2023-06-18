import http from "../http-common";

class StaticDataService {
    getAllCountries() {
        return http.get("/ecomm-sellout-dev-lamda-createpartner/get-geography?country_code=ALL");
    }

    getAllStaticDataList(){
        return http.get(`/ecomm-sellout-dev-lamda-createpartner/get-geography?country_code=refall`);
    }
}

export default new StaticDataService();