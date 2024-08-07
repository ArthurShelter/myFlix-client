import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut }) => {
  const [userInfo, setUserInfo] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    birthDate: ''
  });

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
      setFavoriteMovies(movies.filter(m => data.FavoriteMovies.includes(m._id)));
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

  return (
    <div>
      <h1>Profile</h1>
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
      <h2>Favorite Movies</h2>
      <div>
        {favoriteMovies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
    </div>
  );
};

// I think not needed
// export default ProfileView;