import React from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from 'react-router';


export const NavigationBar = ({ user, onLoggedOut }) => {

  const token = localStorage.getItem('token');

  const [searchbarText, setSearchbarText] = useState('');
  
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchbarText) {
      navigate(`/filter/?query=${encodeURIComponent(searchbarText)}`);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
                <Form onSubmit={handleSearch} className="">
                  <Form.Control
                    type="search"
                    placeholder="Search Movie"
                    className=""
                    value={searchbarText}
                    onChange={(e) => setSearchbarText(e.target.value)}
                  />
                  <Button variant="" type="submit">
                    Search
                  </Button>
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
