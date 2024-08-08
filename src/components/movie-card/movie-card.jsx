import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, updateAction }) => {
  return (
    <Card className="h-100">
      {/* no image for now */}
      <Card.Body>
        <Card.Img variant="top" className="card-poster" src={movie.ImagePath}/>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

// commenting out for now  
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Director: PropTypes.string.isRequired,
    }).isRequired
    };