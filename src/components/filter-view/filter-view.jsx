import React from "react";
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useSearchParams, Link } from "react-router-dom";


export const FilterView = ({ movies }) => {

    const [filteredMovies, setFilteredMovies] = useState(movies);

    const [searchParams] = useSearchParams();

    const searchbarText = searchParams.get('query');

    console.log(searchbarText);

    useEffect(() => {
        setFilteredMovies(
            movies.filter((movie) =>
                movie.Title.toLowerCase().includes(searchbarText.toLowerCase())
            )
        );

        console.log('Navigated to FilterView');
    }, [movies, searchbarText]);


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
                        filteredMovies.map((movie) => (
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
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div >
    );

}
