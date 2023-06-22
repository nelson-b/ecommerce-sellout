import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      
      let redirect_uri_input = ("https://master.dje3o66qxkyld.amplifyapp.com/authendicateUser?code=").concat(authCode); 
      
      let body= {
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: redirect_uri_input 
      };

      let api = "https://ping-sso-uat.schneider-electric.com/as/token.oauth2";

      axios
        .post(api, body, {
          headers: headers
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  });

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