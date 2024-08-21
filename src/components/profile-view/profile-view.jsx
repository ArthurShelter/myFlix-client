import React from "react";
import { useEffect, useState } from 'react';

//for moviecard
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, onLoggedOut, movies }) => {
  const [userInfo, setUserInfo] = useState({});

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    birthDate: ''
  });

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    fetch(`https://your-heroku-app.herokuapp.com/users/${user.Username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserInfo(data);
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

  const handleUpdate = () => {
    fetch(`https://your-heroku-app.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        Username: formData.username,
        Password: formData.password,
        Email: formData.email,
        BirthDate: formData.birthDate
      })
    })
      .then(response => response.json())
      .then(data => {
        setUserInfo(data);
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating user data', error);
      });
  };

  const handleDeregister = () => {
    fetch(`https://your-heroku-app.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        onLoggedOut();
        alert('Account deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting user account', error);
      });
  };

  console.log(user.FavoriteMovies);

  return (
    <div>
      <h1>Profile</h1>
      <h2>User Info</h2>
      <div>
        <div>
          <span>Username: </span>
          <span>{user.Username}</span>
        </div>
        <div>
          <span>Email: </span>
          <span>{user.Email}</span>
        </div>
        <div>
          <span>Birthday: </span>
          <span>{formatDate(user.BirthDate)}</span>
        </div>
      </div>

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
            value={formData.birthDate}
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
      <div>
        <h2>Deregister</h2>
      </div>
      <p>
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
      </p>

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
                // updateAction={() => updateFavoriteMovies(movie.id)}
                />
              </Col>
            ))
          )}
        </Row>
      </>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};