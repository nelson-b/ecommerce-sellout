import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { retrieveUserRoleConfigByAuthCode } from "../../actions/partneraction";
import Cookies from "js-cookie";
import { roles } from "../constant";
import AlertModal from "../modal/alertModel";
import { tokenExpiryTime } from "../../config";

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
              //save user information, bearer token and refresh token in local storage
              setTokenUserInfo(data.data);
            } else {
              console.error('user does not exist!!');
              //show error popup
              setErrorRet(["User does not exist!!"]);
              setShowErrorModal(true);
            }
        })
        .catch((e) => {
          console.log('Error', e);
          navigate("/");
        })
  },[]);

  const setTokenUserInfo = (data) => {
    localStorage.setItem('user_login_info', JSON.stringify(data.principalId));
    let inMinutes = new Date(new Date().getTime() + Number(tokenExpiryTime) * 1000); //data.expires_in 2 hr
    Cookies.set('access_token', data.access_token, { expires: inMinutes }) //token expires in a day
    //navigate to home screen based on the role
    handleNavigation(data.principalId.role_id);
  }

  const handleNavigation = (usrRole) => {
    if(usrRole === roles.EDITOR){
      navigate("/editor/home");
    }
    if(usrRole === roles.BACKUP_EDITOR){
      navigate("/editor/home");
    }
    if(usrRole === roles.APPROVE_1){
      navigate("/approver_1/home");
    }
    if(usrRole === roles.APPROVER_2){
      navigate("/approver_2/home");
    }
    if(usrRole === roles.SUPERVISOR_APPROV_1_2){
      navigate("/superApproverUser/home");
    }
    if(usrRole === roles.SUPERVISOR){
      navigate("/superUser");
    }
    if(usrRole === roles.ADMIN){
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
        <span>Processing authendication.....</span>
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