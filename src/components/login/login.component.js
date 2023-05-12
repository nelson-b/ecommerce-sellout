import React, { useCallback, useState }from 'react';
import './login.component.css';
import logo from './../../images/schneider-electric-logo.svg';
import { Button, Col, Form, Row, Container, Breadcrumb, Card } from "react-bootstrap";
import { BiHome } from 'react-icons/bi';
import MyMenu from "../menu/menu.component";
import { useForm } from "react-hook-form";

function Login() {
    const initialState = {
        username: "",
        usrpassword: ""
    }
    
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
      console.log('form data', data);
    }
    
    const onError = (error) => {
      console.log("ERROR:::", error);
    };

    return (
        <Container fluid>
        <Row>
            <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                <Row className='justify-content-center'>
                    <Card className="cardPanel">
                        <center><Card.Img className='logo' variant="top" src={ logo } /></center>
                        <Row>
                            <Form.Group className="mb-4">
                                <Row className='justify-content-center'>
                                    <Form.Control size="sm"
                                        className='formField'
                                        id="username"
                                        name="username"
                                        placeholder='john@se.com'
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
                                <Row className='justify-content-center'>
                                <Form.Control size="sm"
                                    className='formField'
                                    id="usrpassword"
                                    name="usrpassword"
                                    placeholder='*****'
                                    type="password"
                                    {...register("usrpassword", {
                                    required: "Password is required",
                                    })}
                                />
                                {errors.usrpassword && (
                                    <center>
                                        <Form.Text className="text-danger" >
                                            {errors.usrpassword.message}
                                        </Form.Text>
                                    </center>
                                )}
                                </Row>                                
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Row className='justify-content-center mb-4' >
                                    <Button
                                        variant="success"
                                        className="btn btn-create"
                                        type="submit"
                                        >
                                        Login
                                    </Button>
                                </Row>
                            </Form.Group>
                        </Row>
                    </Card>
                </Row>
            </Form>
        </Row>
        </Container>

    //   <div className="LoginApp">        
    //     <img width="50%" height="50%"
    // alt="Schneider Electric"
    // src={logo}
    // />
    // <Card>
    //     <Form className="Loginform" onSubmit={handleSubmit}>
    //     <h1>Sign in</h1>
    //     <FormGroup>
    //         <Input
    //           type="email"
    //           name="email"
    //           id="exampleEmail"
    //           placeholder="Username"
    //         />
    //     </FormGroup>
    //     <FormGroup>
    //         <Input
    //           type="password"
    //           name="password"
    //           id="examplePassword"
    //           placeholder="Password"
    //         />
    //     </FormGroup>
           
    //     <input type="submit" value="Login" />       
    //   </Form>
    //   </Card>
    // </div>
  );
}

export default Login;