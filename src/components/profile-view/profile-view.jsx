import React from "react";
import { useEffect, useState } from 'react';

//for moviecard
import { Row, Col, Form, Button, Card, Container } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
// import "./profile-view.scss";
import "../movie-card/movie-card.scss";

export const ProfileView = ({ user, token, onLoggedOut, movies, onUserUpdate  }) => {
  // const [userInfo, setUserInfo] = useState({});

  // const storedUser = JSON.parse(localStorage.getItem("user"));

  const [userInfo, setUserInfo] = useState(user ? user : null);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    birthDate: ''
  });

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const date = new Date(dateInput);
    if (isNaN(date)) return "N/A"; // If date is invalid, return "N/A"
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem('user'));
    // const token = localStorage.getItem('token');
    // not appropriate


    fetch(`https://movie-db-fullstack-2-27a48700ab77.herokuapp.com/users/${user.Username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Fetched user data:", data); // Debugging log

        // setUserInfo(data);

        setUserInfo({
          username: data.Username, // Ensuring consistent keys
          email: data.Email,
          birthDate: data.BirthDate
        });

        setFormData({
          username: data.Username,
          password: '',
          email: data.Email,
          birthDate: data.BirthDate
        });
      })
      .catch(error => {
        console.error('Error fetching user data', error);
      });
  }, [user, token, movies]);

  const handleUpdate = (e) => {
    console.log(userInfo); 
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    fetch(`https://movie-db-fullstack-2-27a48700ab77.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        Username: formData.username,
        Password: formData.password,
        Email: formData.email,
        BirthDate: formData.birthDate
      })
    })
      .then(response => response.json())
      .then((data) => {
        // setUserInfo(data);

        setUserInfo({
          username: data.Username,
          email: data.Email,
          birthDate: data.BirthDate
        });

        localStorage.setItem('user', JSON.stringify(data));

        // Call the parent update function to update the user state
        onUserUpdate(data);

        alert('Profile updated successfully');

        // window.location.reload();
        console.log("Here is the updated user info:", userInfo); 
      })
      .catch(error => {
        console.error('Error updating user data', error);
      });
  };

  const handleDeregister = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    fetch(`https://movie-db-fullstack-2-27a48700ab77.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete account');
        }

        return response.text().then(text => {
          try {
            return JSON.parse(text); // Try to parse as JSON
          } catch {
            return text; // If parsing fails, return text
          }
        });

      })
      .then(() => {
        localStorage.clear();
        window.location.reload();
        alert('Account deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting user account', error);
        alert('There was an error deleting your account. Please try again.');
      });
  };

  // console.log(user.FavoriteMovies); debugging code, not needed at the moment
  console.log(userInfo); 

  return (
    <Container>
      <Card>
        <Card.Body>
          <h1>Profile</h1>
          <h2>User Info</h2>
          <div>
            <div>
              <span>Username: </span>
              {/* <span>{userInfo.Username}</span> */}
              <span>{userInfo.Username}</span>
            </div>
            <div>
              <span>Email: </span>
              {/* <span>{userInfo.Email}</span> */}
              <span>{userInfo.Email}</span>
            </div>
            <div>
              <span>Birthday: </span>
              <span>{formatDate(userInfo.BirthDate)}</span>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Form className="profile-form h-100" onSubmit={handleUpdate}>
            <h4>Update your profile:</h4>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                required
                minLength="5"
                placeholder="Username must be at least 5 characters."
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
                minLength="5"
                placeholder="Password must be at least 5 characters."
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="Enter a valid email address."
              />
            </Form.Group>
            <Form.Group controlId="formBirthdate">
              <Form.Label>Birthdate:</Form.Label>
              <Form.Control
                type="date"
                name="Birthdate"
                value={formatDate(formData.birthDate)}
                onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                required
                placeholder="Enter your birth date."
              />
            </Form.Group>

            <div>
              <Button
                className="submit-button"
                style={{ cursor: 'pointer', marginTop: '10px' }}
                variant="primary"
                type="submit"
              >
                Submit change
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <div>
            <h2>Deregister</h2>
          </div>
          <div>
            <Button
              className="deregister-button"
              variant="danger"
              style={{ cursor: 'pointer' }}
              onClick={handleDeregister}
            >
              Delete account
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <>
            <Row>
              <Col xs={12}>
                <h2>Favorite Movies</h2>
              </Col>
            </Row>
            <Row>
              {user.FavoriteMovies.length === 0 ? (
                <p>No favorite movies yet...</p>
              ) : (
                movies.filter((movie) => user.FavoriteMovies.includes(movie.id)).map((movie) => (
                  <Col className="mb-4"
                    xs={12} sm={12} md={6} lg={6}
                    key={movie.id}
                  >
                    <MovieCard
                      movie={movie}
                    />
                  </Col>
                ))
              )}
            </Row>
          </>
        </Card.Body>
      </Card>

      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </Container>
  );
};