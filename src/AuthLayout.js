import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  //---------code to deploy(uncomment before deploying)---------//
 let isAuthenticated = false;
  if (Cookies.get('access_token')) {
    isAuthenticated = true;
  }
  //-------code to deploy-----------//

  //-------code to test(comment before deploying)-----------//
  //  let isAuthenticated = true;
  //-------code to test-----------//
  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />; // or loading indicator, etc...
};

export default AuthLayout;