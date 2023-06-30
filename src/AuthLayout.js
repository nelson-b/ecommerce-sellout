import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  let isAuthenticated = true;
  
  // if (Cookies.get('access_token')) {
  //   isAuthenticated = true;
  // }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />; // or loading indicator, etc...
};

export default AuthLayout;