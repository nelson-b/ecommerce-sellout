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
import { redirectUrl, signInLink } from "../../config";
import { api_ret_client_id, client_id } from "../constant";

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

  const loginNavigation = (data) => {
    if(data.username=="nelson@se.com" && data.usrpassword=="test@123"){
      navigate("/editor/home");
    }
    if(data.username=="approve_1@se.com" && data.usrpassword=="test@123"){
      navigate("/approver_1/home");
    }
    if(data.username=="approver_2@se.com" && data.usrpassword=="test@123"){
      navigate("/approver_2/home");
    }
    if(data.username=="thomas@se.com" && data.usrpassword=="test@123"){
      navigate("/superApproverUser/home");
    }
    if(data.username=="jean@se.com" && data.usrpassword=="test@123"){
      navigate("/admin/home");
    }
    if(data.username=="marie@se.com" && data.usrpassword=="test@123"){
      navigate("/superUser");
    }

    console.log('loginNavigation', data);
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
    
        let api = signInLink.concat(redirectUrl);
        console.log('signInLink', api);
        props.retrieveStaticDataByAttrName(client_id)
          .then((data)=>{
          console.log('data[0].attribute_value', data[0].attribute_value);
          let apiWithClientId = api.replace(`[${api_ret_client_id}]`,data[0].attribute_value);
          console.log('apiWithClientId', apiWithClientId);
    
          if(data){
            axios
              .get(apiWithClientId, {
                headers: headers
              })
              .then((response) => {
                  console.log(response);
              })
              .catch((error) => {
                  console.log(error);
              });
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

export default connect(null, { retrieveStaticDataByAttrName })(Login);