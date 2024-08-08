import React from "react";
// not using useEffect... yet
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip'
import "./movie-view.scss";

//note to self: fix class names

// This is the "single movie view" that appears when you click a movie

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const [isFavorite, setFavoriteStatusTo] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.FavoriteMovies.includes(movieId)) {
      setFavoriteStatusTo(true);
    }
  }, [movieId]);

  const handleAddToFavorites = async (movieId) => {
    // event.preventDefault();

    //add in "try {}"?

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const response = await fetch(`https://movie-db-fullstack-2-27a48700ab77.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "PUT",
      // body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Unauthorized');
      else {
        throw new Error('Favorite failed');
      }
    }

    const updatedUser = await response.json();
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setFavoriteStatusTo(true);

    //alert('Favorited successfully');

    // look into this
    // updateAction(movieId);
  }

  const handleRemoveFromFavorites = async (movieId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    const response = await fetch(`https://movie-db-fullstack-2-27a48700ab77.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      // body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Unauthorized');
      else {
        throw new Error('Remove Favorite failed');
      }
    }

    const updatedUser = await response.json();
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setFavoriteStatusTo(false);

    // look into this
    // updateAction(movieId);

  }

  return (
    <div>
      <div>
        <img className="view-poster" src={movie.ImagePath} alt={movie.Title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span className="genre-container">
          <a data-tooltip-id="my-genre-tooltip">{movie.Genre.Name} (mouse over for genre description)</a>
          <Tooltip id="my-genre-tooltip">
            <button>{movie.Genre.Description}</button>
          </Tooltip>
        </span>
      </div>
      <p>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
      </p>

      <div>
        {isFavorite ? (
          <p>
            <div>
              <button className="unfavorite-button"
                onClick={() => handleRemoveFromFavorites(movie.id)}
              >
                Remove from Favorites</button>
            </div>
          </p>
        ) : (
          <p>
            <div>
              <button className="favorite-button" onClick={() => handleAddToFavorites(movie.id)}>Add to Favorites</button>
            </div>
          </p>
        )}
      </div>
      <p>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </p>
    </div>
  );
};
