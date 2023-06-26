import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  // if (Cookies.get('token')) {
    // const isAuthenticated = Cookies.get('token')? false : true;
    const isAuthenticated = Cookies.get('token')? true : false;
    return isAuthenticated ? <Outlet /> : null; // or loading indicator, etc...
  // }
  
  // return <Navigate to={"/"} replace />;
};

export default AuthLayout;