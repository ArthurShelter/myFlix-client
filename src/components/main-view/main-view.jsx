import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Adaptation",
      image:
        "https://minimovieposters.com/cdn/shop/products/MPW-101495-a_1024x1024.jpg?v=1571439883",
      director: "Spike Jonze",
    },
    {
      id: 2,
      title: "I Heart Huckabees",
      image:
        "https://imgs.search.brave.com/6hBIz1P3eKQq9Rao9fdLTezMUaAbr8ObXf5YlVCdGNc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/cG9zdGVyaXRhdGku/Y29tL3Bvc3RlcnMv/MDAwLzAwMC8wMzIv/MTU4L2ktaGVhcnQt/aHVja2FiZWVzLW1k/LXdlYi5qcGc",
      director: "David O. Russell",
    },
    {
      id: 3,
      title: "REDLINE",
      image:
        "https://m.media-amazon.com/images/I/61lT0bkuHkL._AC_.jpg",
      director: "Takeshi Koike",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
  );
};
