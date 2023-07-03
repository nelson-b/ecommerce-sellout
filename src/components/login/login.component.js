import React, { useState } from "react";
import "./login.component.css";
import logo from "./../../images/schneider-electric-logo.svg";
import {
  Button,
  Form,
  Row,
  Container,
  Card,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { retrieveStaticDataByAttrName } from "../../actions/staticDataAction";
import { retrieveByEmailId } from "../../actions/userAction";
import { redirectUrl, signInLink } from "../../config";
import { api_ret_client_id, client_id, roles } from "../constant";
import AlertModal from "../modal/alertModel";

function Login(props) {
  const navigate = useNavigate();
  
  const initialState = {
    username: "",
    usrpassword: "",
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [formData, setFormData] = useState(initialState);
  const onError = (error) => {
    console.log("ERROR:::", error);
  };
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };
  const [successRet, setSuccessRet] = useState([]);
  const successmsg = {
    headerLabel: "Success....",
    variant: "success",
    header: successRet,
    content: [],
  };

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

  const handleSSOLogin = () => {
        //redirected to below Ping login URL
        const headers = {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Origin,Accept",
          "Access-Control-Allow-Methods" : "OPTIONS,POST,GET,PUT",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With" : "*"
        }
    
        let link = signInLink.concat(redirectUrl);
        console.log('signInLink', link);
        props.retrieveStaticDataByAttrName(client_id)
          .then((data)=>{
          if(data){
            console.log('data[0].attribute_value', data[0].attribute_value);
            if(data[0].attribute_value){
              let signInLinkWithClientId = link.replace(`[${api_ret_client_id}]`,
              data[0].attribute_value);
              console.log('apiWithClientId', signInLinkWithClientId);
              //open the ping url in browser, it will redirect to authenticate url with auth code to validate authendication
              window.open(signInLinkWithClientId, "_self");
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
  }

  return (
    <Container fluid>
      <Row>
          <Row className="justify-content-center">
            <Card className="cardPanel">
              <center>
                <Card.Img className="logo" variant="top" src={logo} />
              </center>
              <Row>
                <Form.Group className="mb-4">
                  <Row className="justify-content-center mb-4">
                    <Button
                      className="btn-login save-header btn-create"
                      onClick={handleSSOLogin}
                      >
                      SSO Login
                    </Button>
                    <AlertModal
                      show={showSuccessModal}
                      handleClose={handleCloseSuccessModal}
                      body={successmsg}
                    />
                    <AlertModal
                      show={showErrorModal}
                      handleClose={handleCloseErrorModal}
                      body={errormsg}
                    />
                  </Row>
                </Form.Group>
              </Row>
            </Card>
          </Row>
      </Row>
    </Container>
  );
}

export default connect(null, { retrieveStaticDataByAttrName, retrieveByEmailId })(Login);