import React from "react";
import { useEffect, useState } from 'react';

//for moviecard
import { Row, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

//taking movies and favoriteMovies out for now
export const ProfileView = ({ user, token, onLoggedOut, movies, updateFavoriteMovies }) => {
  const [userInfo, setUserInfo] = useState({});
  // const [movies, setMovies] = useState([]);
  const [FavoriteMovieIdsFromApi, setFavoriteMovieIdsFromApi] = useState([]);
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
    fetch(`https://your-heroku-app.herokuapp.com/users/${user}`, {
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
    fetch(`https://your-heroku-app.herokuapp.com/users/${user}`, {
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
    fetch(`https://your-heroku-app.herokuapp.com/users/${user}`, {
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
      <h2>Update Info</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={formData.username}
          onChange={e => setFormData({ ...formData, username: e.target.value })}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={formData.birthDate}
          onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
        />
      </div>
      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleDeregister}>Deregister</button>
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
              <Col
                xs={12} sm={12} md={6} lg={6}
                key={movie.id}
                className="movie-container"
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


// I think not needed
// export default ProfileView;