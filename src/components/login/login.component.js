import React from 'react';
import { Form, FormGroup, Input, Card } from 'reactstrap';
import './login.component.css';
import logo from './../../images/schneider-electric-logo.png'

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form is submitted"+e);
}

function Login() {
    return (
      <div className="LoginApp">        
        <img width="50%" height="50%"
    alt="Schneider Electric"
    src={logo}
    />
    <Card>
        <Form className="Loginform" onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <FormGroup>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Username"
            />
        </FormGroup>
        <FormGroup>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
            />
        </FormGroup>
           
        <input type="submit" value="Login" />       
      </Form>
      </Card>
    </div>
  );
}

export default Login;