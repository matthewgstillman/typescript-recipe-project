import React, { FC } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavBarComponent: FC = () => {
  return (
    <div>
      <Navbar bg="dark" fixed="top" variant="dark">
        <Container>
          <Navbar.Brand href="/">Food Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/mealplanner">Meal Planner</Nav.Link>
              <Nav.Link href="/random">Random Recipe</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarComponent;
