import { FC, useState } from 'react';
import { Movie } from '@shared/types/movie';
import { MIN_RATING, MINUTES_IN_HOUR } from '../constants';
import styles from '../Hero.module.scss';
import HeartIcon from "@shared/assets/icons/heart.svg";
import HeartActiveIcon from "@shared/assets/icons/heartActive.svg";
import RandomIcon from "@shared/assets/icons/random.svg";
import StarIcon from "@shared/assets/icons/star.svg";


interface HeroContentProps {
  movie: Movie;
  onGetRandomMovie: () => void;
}

export const HeroContent: FC<HeroContentProps> = ({ movie, onGetRandomMovie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / MINUTES_IN_HOUR);
    const mins = minutes % MINUTES_IN_HOUR;
    return `${hours} ч ${mins} мин`;
  };

  const getRatingClass = (rating: number): string => {
    return rating < MIN_RATING ? styles.lowRating : '';
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.infoSection}>
          <div className={styles.ratingRow}>
            <div className={`${styles.rating} ${getRatingClass(movie.tmdbRating || 0)}`}>
              <img src={StarIcon} alt="Рейтинг" className={styles.ratingIcon} />
              {movie.tmdbRating?.toFixed(1) || 'N/A'}
            </div>
            <div className={styles.meta}>
              <span className={styles.metaItem}>{movie.releaseYear}</span>
              <span className={styles.metaItem}>{movie.genres?.[0] || 'Жанр'}</span>
              <span className={styles.metaItem}>{formatRuntime(movie.runtime)}</span>
            </div>
          </div>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.description}>{movie.plot}</p>
          <div className={styles.actions}>
            <button className={styles.trailerButton}>
              Трейлер
            </button>
            <button className={styles.aboutButton}>
              О фильме
            </button>
            <button 
              className={styles.favoriteButton}
              onClick={toggleFavorite}
            >
              <img 
                src={isFavorite ? HeartActiveIcon : HeartIcon} 
                alt="Избранное" 
              />
            </button>
            <button 
              className={styles.randomButton}
              onClick={onGetRandomMovie}
            >
              <img src={RandomIcon} alt="Случайный фильм" />
            </button>
          </div>
        </div>

        <div className={styles.posterSection}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className={styles.poster}
          />
        </div>
      </div>
    </section>
  );
};