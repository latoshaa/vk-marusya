import { FC, useState } from 'react';
import { Movie } from '@shared/types/movie';
import { MIN_RATING, MINUTES_IN_HOUR } from '../constants';
import { useAuthGuard } from '@features/auth/hooks/useAuthGuard';
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
  const { requireAuth } = useAuthGuard();

  const toggleFavorite = () => {
    requireAuth(() => {
      setIsFavorite(!isFavorite);
    });
  };

  const formatRuntime = (minutes: number | undefined): string => {
    if (!minutes) return 'Не указано';
    const hours = Math.floor(minutes / MINUTES_IN_HOUR);
    const mins = minutes % MINUTES_IN_HOUR;
    return `${hours} ч ${mins} мин`;
  };

  const getRatingClass = (rating: number | undefined): string => {
  const ratingValue = rating || 0;
  return (ratingValue < MIN_RATING ? styles.lowRating : '') as string;
};

  const getSafeValue = (value: string | undefined): string => {
    return value || 'Не указано';
  };

  const getSafeNumber = (value: number | undefined): string => {
    return value ? value.toString() : 'Не указано';
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.infoSection}>
          <div className={styles.ratingRow}>
            <div className={`${styles.rating} ${getRatingClass(movie.tmdbRating)}`}>
              <img src={StarIcon} alt="Рейтинг" className={styles.ratingIcon} />
              {movie.tmdbRating ? movie.tmdbRating.toFixed(1) : 'N/A'}
            </div>
            <div className={styles.meta}>
              <span className={styles.metaItem}>{getSafeNumber(movie.releaseYear)}</span>
              <span className={styles.metaItem}>{movie.genres?.[0] || 'Жанр'}</span>
              <span className={styles.metaItem}>{formatRuntime(movie.runtime)}</span>
            </div>
          </div>
          <h1 className={styles.title}>{getSafeValue(movie.title)}</h1>
          <p className={styles.description}>{getSafeValue(movie.plot)}</p>
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
            src={movie.posterUrl || ''}
            alt={movie.title || 'Фильм'}
            className={styles.poster}
          />
        </div>
      </div>
    </section>
  );
};