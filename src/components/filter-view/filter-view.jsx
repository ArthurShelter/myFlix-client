import React from "react";
// not using useEffect at the moment
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

export const FilterView = ({ user, movies, searchbarText }) => {

    const [filteredMovies, setFilteredMovies] = useState(movies);

    // use url param instead of searchbar text?

    useEffect(() => {
        setFilteredMovies(
            movies.filter((movie) =>
                movie.Title.toLowerCase().includes(searchbarText.toLowerCase())
            )
        );
        console.log('Navigated to PageComponent');
        // Fetch data, update state, etc.

      }, []); // Empty dependency array ensures this runs only once when the component mounts


    return (
        <div>
            <>
                <Row>
                    <Col xs={12}>
                        <h2>Search Results</h2>
                    </Col>
                </Row>
                <Row>
                    {filteredMovies.length === 0 ? (
                        <p>No movies here...</p>
                    ) : (
                        // movies.filter((movie) => user.FavoriteMovies.includes(movie.id)).map((movie) => (
                        filteredMovies.map((movie) => (
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
        </div >
    );

}
