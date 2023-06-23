import Cookies from 'js-cookie';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteGuard = ({ component: Component, ...rest }) => {
    // const navigate = useNavigate();
    function hasJWT() {
        let flag = false;
        //check user has JWT token
        Cookies.get('token') ? flag = true : flag = false
        return flag
    }
    return (
        <Route {...rest}
            render={props => (
                //if valid token redirect to home page or redirect to login screen
                hasJWT() ? <Component {...props} /> : <Navigate to={{ pathname: '/' }} />
            )}
        />
    );
}

export default RouteGuard; 