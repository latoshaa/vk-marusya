import { useCallback } from 'react';
import './MovieCard.scss';

const MovieCard = ({ movie, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(movie.id);
  }, [movie.id, onClick]);

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-card__image-wrapper">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="movie-card__image"
        />
        <div className="movie-card__overlay">
          <div className="movie-card__rating">⭐ {movie.tmdbRating.toFixed(1)}</div>
        </div>
      </div>
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{movie.releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;

