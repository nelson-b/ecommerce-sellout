import http from "../http-common";

class LoginService {
    getToken(data){
        return http.get('/api/login');
    }
}

export default new LoginService();