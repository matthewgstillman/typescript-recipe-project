import React, { FC } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBarComponent: FC = () => {
  return (
    <div>
      {/* <Navbar bg="dark" fixed="top" variant="dark">
        <Navbar.Brand style={{ marginLeft: "10px" }} href="/">
          Random Recipe Generator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar> */}
      <Container>
        <Navbar bg="dark" fixed="top" variant="dark">
          <Nav className="justify-content-center" style={{ flex: 1 }}>
            <Nav.Link href="/">Random Recipe Generator</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavBarComponent;
