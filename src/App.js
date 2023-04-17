


import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom';
import addSelloutdata from "./components/add-selloutdata.component";
import { createBrowserHistory as createHistory } from "history";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const history = createHistory();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

const MissingPage = () => <h1>404</h1>

  return (
    <div className="App">
      <Router history={history}>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ecommerce Sellout</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Link to='/'>Go to Home</Link> <br />
        <Routes>
          <Route path="/" component={ addSelloutdata } />
          <Route component={MissingPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;