import http from "../http-common";

class StaticDataService {
    getAllCountries() {
        return http.get("/create-partner/ecomm-sellout-dev-lamda-createpartner/get-geography?country_code=ALL");
    }
}

export default new StaticDataService();