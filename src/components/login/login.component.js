import React, { useCallback, useState } from "react";
import "./login.component.css";
import logo from "./../../images/schneider-electric-logo.svg";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Breadcrumb,
  Card,
} from "react-bootstrap";
import { BiHome } from "react-icons/bi";
import MyMenu from "../menu/menu.component";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const onSubmit = (data) => {
    loginNavigation(data);
  };

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

  const loginNavigation = (data) => {
    props.retrieveByEmailId(data.username)
      .then((data) => {
        console.log('retrieveByEmailId', data);
        if(data.length > 0){
        setShowErrorModal(false);
        
        let respData = {
          email: data[0].email_id,
          role_id: data[0].role_id,
          first_name: data[0].first_name,
          last_name: data[0].last_name
        }

        console.log('respData', respData);
        //save in local storage
          localStorage.setItem('user_login_info', JSON.stringify(respData))
          //redirect to home page
          handleNavigation(respData.role_id);
        }
        else {
          //user does not exist
          console.error('user does not exist!!');
          setErrorRet(["User does not exist!!"]);
          setShowErrorModal(true);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  };

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
              let signInLinkWithClientId = link.replace(`[${api_ret_client_id}]`,data[0].attribute_value);
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
        <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
          <Row className="justify-content-center">
            <Card className="cardPanel">
              <center>
                <Card.Img className="logo" variant="top" src={logo} />
              </center>
              <Row>
                <Form.Group className="mb-4">
                  <Row className="justify-content-center">
                    <Form.Control
                      size="sm"
                      className="formField"
                      id="username"
                      name="username"
                      placeholder="john@se.com"
                      type="text"
                      {...register("username", {
                        required: "User name is required",
                      })}
                    />
                    {errors.username && (
                      <center>
                        <Form.Text className="text-danger">
                          {errors.username.message}
                        </Form.Text>
                      </center>
                    )}
                  </Row>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Row className="justify-content-center">
                    <Form.Control
                      size="sm"
                      className="formField"
                      id="usrpassword"
                      name="usrpassword"
                      placeholder="*****"
                      type="password"
                      {...register("usrpassword", {
                        required: "Password is required",
                      })}
                    />
                    {errors.usrpassword && (
                      <center>
                        <Form.Text className="text-danger">
                          {errors.usrpassword.message}
                        </Form.Text>
                      </center>
                    )}
                  </Row>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Row className="justify-content-center mb-4">
                    <Button
                      className="btn-login save-header btn-create"
                      type="submit"
                      >
                      Login
                    </Button>
                    <Button
                      className="btn-login save-header btn-create"
                      onClick={handleSSOLogin}
                      >
                      SSO Login (WIP)
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
        </Form>
      </Row>
    </Container>
  );
}

export default connect(null, { retrieveStaticDataByAttrName, retrieveByEmailId })(Login);