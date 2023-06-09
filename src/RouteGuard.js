import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RouteGuard = ({ component: Component, ...rest }) => {
    function hasJWT() {
        let flag = false;
        //check user has JWT token
        localStorage.getItem("token") ? flag=true : flag=false
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