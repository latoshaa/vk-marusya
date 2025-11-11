import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { Movie } from "@shared/types/movie";
import styles from "./MovieCard.module.scss";

interface MovieCardProps {
  movie: Movie;
  number: number;
  onClick?: (movieId: number) => void;
}

const DOUBLE_DIGIT_THRESHOLD = 10;

export const MovieCard: FC<MovieCardProps> = ({ movie, number, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
    if (onClick) {
      onClick(movie.id);
    }
  };

  const isDoubleDigit = number >= DOUBLE_DIGIT_THRESHOLD;

  return (
    <div className={styles.movieCard} onClick={handleClick}>
      <div
        className={`${styles.numberBadge} ${
          isDoubleDigit ? styles.doubleDigit : ""
        }`}
      >
        <span className={styles.number}>{number}</span>
      </div>

      <div className={styles.imageWrapper}>
        <img src={movie.posterUrl} alt={movie.title} className={styles.image} />

        <div className={styles.overlay}>
          <div className={styles.content}>
            <h3 className={styles.title}>{movie.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
