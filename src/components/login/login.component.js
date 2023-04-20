import React, { useState, useEffect } from 'react';
import './login.component.css';
import logo from './../../images/schneider-electric-logo.png'
import { Container, Form, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

function Login() {
  const initState = {
    usremail: "",
    usrpassword: ""
  };

  const [initialValues, setInitialValues] = useState(initState);

  const onSubmit = (values) => {
    console.log("Values:::", values);
    console.log("Values:::", JSON.stringify(values));
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });

    return (
      <div className="LoginApp">        
        <img width="50%" height="50%"
        alt="Schneider Electric"
        src={logo}
        />
      <Container className="my-4">
        <Form noValidate className="Loginform" onSubmit={handleSubmit(onSubmit, onError)}>
          <Form.Group className="mb-3" controlId="frmEmail">
            <Form.Control
              type="email"
              placeholder="johndeo@gmail.com"
              {...register("email", { required: "Email id is required" })}
            />
            {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="frmPassword">
          <Form.Control
            type="password"
            placeholder="**********"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
          </Form.Group>
            
          <Button variant="primary" type="submit">Login</Button>   
        </Form>
      </Container>
    </div>
  );
}

export default Login;