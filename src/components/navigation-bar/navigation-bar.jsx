import React from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from 'react-router';


export const NavigationBar = ({ user, onLoggedOut, movies }) => {

  const token = localStorage.getItem('token');

  const [searchbarText, setSearchbarText] = useState('');

  const [filteredMovies, setFilteredMovies] = useState(movies);

  const navigate = useNavigate()

  const handleSearch = () => {
    // console.log(`Searching for: ${searchbarText}`);
    setFilteredMovies(
      movies.filter((movie) =>
          movie.Title.toLowerCase().includes(searchbarText.toLowerCase())
      )
  );

    navigate(`/filter/${encodeURIComponent(searchbarText)}`);
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
                {/* <Form className="d-none d-lg-flex mx-auto align-items-center">
                  <Form.Control
                    type="search"
                    placeholder="Search movie"
                    className="me-2 custom-search"
                    aria-label="Search"
                    onChange={handleSearchChange}
                  />
                  <Button variant="outline-light">Search</Button>
                </Form> */}
                <Form className="">
                  <Form.Control
                    type="search"
                    placeholder="Search Movie"
                    className=""
                    value={searchbarText}
                    onChange={(e) => setSearchbarText(e.target.value)}
                  />
                  <Button variant=""
                    as={Link}
                    to={`/filter/${encodeURIComponent(searchbarText)}`}
                    onClick={handleSearch}
                  >
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
