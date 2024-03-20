import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Login
            </Link>
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/mail" className="nav-link">
              Mail
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation