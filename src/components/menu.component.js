import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

function MyMenu(){

  const toggle = () => {
    toggleNavbar(!isOpen);
  };
  
  const [isOpen, toggleNavbar] = useState(false);

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ecommerce Sellout</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/add">Add</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
}

export default MyMenu