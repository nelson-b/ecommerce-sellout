import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { retrieveUserRoleConfigByAuthCode } from "../../actions/partneraction";
import Cookies from "js-cookie";
import { roles, user_login_info, user_not_exist_msg } from "../constant";
import AlertModal from "../modal/alertModel";
import { tokenExpiryMinusAttr } from "../../config";

function Authenticate(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const authCode = new URLSearchParams(location.search).get("code");
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const [errorRet, setErrorRet] = useState([]);

  const errormsg = {
    headerLabel: "Error....",
    variant: "danger",
    header: "There are errors while processing.",
    content: errorRet,
  };

  useEffect(()=>{
      console.log('authCode', authCode);

      props
        .retrieveUserRoleConfigByAuthCode(authCode)
        .then((data) => {
            console.log('retrieveUserRoleConfigByAuthCode', data);
            if(data.data){
              setShowErrorModal(false);
              //save user information in local storage and bearer token and refresh token in cookies
              setTokenUserInfo(data.data);
            } else {
              console.error(user_not_exist_msg);
              //show error popup
              setErrorRet([user_not_exist_msg]);
              setShowErrorModal(true);
            }
        })
        .catch((e) => {
          console.log('Error', e);
          navigate("/");
        })
  },[]);

  const setTokenUserInfo = (data) => {
    let userDetails = JSON.parse(data.principalId.replace(/'/g, '"'));
    console.log('setTokenUserInfo', userDetails);
    localStorage.setItem(user_login_info, JSON.stringify(userDetails));
    //expiring token half hour before ping to avoid conflicts
    let inMinutes = new Date(new Date().getTime() + Number(data.expires_in - tokenExpiryMinusAttr) * 1000); //data.expires_in 2 hr
    Cookies.set('access_token', data.access_token, { expires: inMinutes }) //token expires in a day
    //navigate to home screen based on the role
    handleNavigation(userDetails.role_id);
  }

  const handleNavigation = (usrRole) => {
    console.log('handleNavigation', usrRole);
    if(usrRole === roles.editor.toUpperCase()){
      navigate("/editor/home");
    }
    if(usrRole === roles.backup_editor.toUpperCase()){
      navigate("/editor/home");
    }
    if(usrRole === roles.approve_1.toUpperCase()){
      navigate("/approver_1/home");
    }
    if(usrRole === roles.approver_2.toUpperCase()){
      navigate("/approver_2/home");
    }
    if(usrRole === roles.supervisor_approv_1_2.toUpperCase()){
      navigate("/superApproverUser/home");
    }
    if(usrRole === roles.supervisor.toUpperCase()){
      navigate("/superUser");
    }
    if(usrRole === roles.admin.toUpperCase()){
      navigate("/admin/home");
    }

    console.log('loginNavigation', roles);
  }


  // const getLoginUserEmailId = (data) => {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer '.concat(data)
  //   };

  //   let api = 'https://ping-sso-uat.schneider-electric.com/idp/userinfo.openid';
  //   let retEmailId = '';
  //   axios
  //   .get(api, {
  //     headers: headers
  //   })
  //   .then((response) => {
  //       console.log(response);
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //   });
  //   return retEmailId;
  // }

  return (
    <Container fluid>
      <Row>
        <span>Processing authentication.....</span>
        <AlertModal
          show={showErrorModal}
          handleClose={handleCloseErrorModal}
          body={errormsg}
         />
      </Row>
    </Container>
  ); 
}

export default connect(null, { retrieveUserRoleConfigByAuthCode })(Authenticate);