import { useEffect, useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

import { LoginView } from "../login-view/login-view";

import { SignupView } from "../signup-view/signup-view";

// {
//   id: 1,
//   title: "Adaptation",
//   image:
//     "https://minimovieposters.com/cdn/shop/products/MPW-101495-a_1024x1024.jpg?v=1571439883",
//   director: "Spike Jonze",
// },
// {
//   id: 2,
//   title: "I Heart Huckabees",
//   image:
//     "https://imgs.search.brave.com/6hBIz1P3eKQq9Rao9fdLTezMUaAbr8ObXf5YlVCdGNc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cG9zdGVyaXRhdGku/Y29tL3Bvc3RlcnMv/MDAwLzAwMC8wMzIv/MTU4L2ktaGVhcnQt/aHVja2FiZWVzLW1k/LXdlYi5qcGc",
//   director: "David O. Russell",
// },
// {
//   id: 3,
//   title: "REDLINE",
//   image:
//     "https://m.media-amazon.com/images/I/61lT0bkuHkL._AC_.jpg",
//   director: "Takeshi Koike",
// },

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser? storedUser : null);

  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {

    if (!token) return;

    fetch("https://movie-db-fullstack-2-27a48700ab77.herokuapp.com/movies", {headers: { Authorization: `Bearer ${token}`}, })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc._id,
            Title: doc.Title,
            Director: doc.Director.name
          };
        });

        setMovies(moviesFromApi);
      });

  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <div>
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          );
        })}
      </div>
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>

  );
};
