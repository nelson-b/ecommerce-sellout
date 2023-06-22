import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authorizationRequestUrl, getAccessTokenUrl } from "../../config";
import Cookies from "js-cookie";

function Authenticate(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const authCode = new URLSearchParams(location.search).get("code");
  const authError = new URLSearchParams(location.search).get("error");
  const authErrorDesc = new URLSearchParams(location.search).get("error_description");
  
  useEffect(()=>{
      //redirected to below Ping token URL
      let authorizationHeaderInput = ('Basic ').concat(authCode);
      
      const headers = {
        'Content-Type': 'application/json',
        Authorization: authorizationHeaderInput
      };
      
      let redirect_uri_input = authorizationRequestUrl.concat(authCode); 
      
      let body= {
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: redirect_uri_input 
      };

      let api = getAccessTokenUrl;

      axios
        .post(api, body, {
          headers: headers
        })
        .then((response) => {
          //token
          console.log(response);
          Cookies.set('token', response, { expires: 7 })
          //call api to get email id
          getLoginUserEmailId(response)
        })
        .catch((error) => {
          console.log(error);
        });
  });

  const getLoginUserEmailId = (data) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer '.concat(data)
    };

    let api = 'https://ping-sso-uat.schneider-electric.com/idp/userinfo.openid';
    let retEmailId = '';
    axios
    .get(api, {
      headers: headers
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
    return retEmailId;
  }

  return (
    <Container fluid>
      <Row>
        <div>Authendication code: {authCode}</div>
        <div>Authendication error: {authError}</div>
        <div>Authendication error description: {authErrorDesc}</div>
      </Row>
    </Container>
  ); 
}

export default connect(null, {})(Authenticate);