import { FC, useState } from 'react';
import { Movie } from '../../components/movie/model/types';
import styles from './Hero.module.scss';
import HeartIcon from '../../assets/heart.svg';
import HeartActiveIcon from '../../assets/heartActive.svg';
import RandomIcon from '../../assets/random.svg';
import StarIcon from '../../assets/star.svg';

interface HeroProps {
  movie: Movie | null;
  onGetRandomMovie: () => void;
  isLoading?: boolean;
}

export const Hero: FC<HeroProps> = ({ movie, onGetRandomMovie, isLoading }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins} мин`;
  };

  const getRatingClass = (rating: number): string => {
    return rating < 7.0 ? styles.lowRating : '';
  };

  if (!movie) {
    return (
      <div className={styles.heroEmpty}>
        <div className={styles.heroEmptyContent}>
          <h1 className={styles.heroEmptyTitle}>Welcome</h1>
          <p className={styles.heroEmptyText}>The best films</p>
          <button 
            className={styles.randomButton}
            onClick={onGetRandomMovie}
            disabled={isLoading}
          >
            <img src={RandomIcon} alt="Случайный фильм" />
          </button>
        </div>
      </div>
    );
  }

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