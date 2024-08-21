import React from "react";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { FilterView } from "../filter-view/filter-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    if (!token) return;

    fetch("https://myflixproject2024.netlify.app/movies", { headers: { Authorization: `Bearer ${token}` }, })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            Genre: movie.Genre,
            Description: movie.Description,
            Director: movie.Director?.Name,
            ImagePath: movie.ImagePath
          };
        });
        console.log(moviesFromApi);
        setMovies(moviesFromApi);
      });

  }, [token]);

  const movieList = movies;

  return (
    <BrowserRouter>
      <NavigationBar
        movies={movieList}
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movieList.length === 0 ? (
                  <Col>The List is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movieList} setUser={setUser} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movieList.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movieList.map((movie) => (
                      <Col className="mb-4" key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard
                          movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movieList.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <ProfileView onLoggedIn={(user, token)} user={user} movies={movieList} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/filter"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movieList.length === 0 ? (
                  <Col>The List is empty!</Col>
                ) : (
                  <Col md={8}>
                    <FilterView movies={movieList} />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
