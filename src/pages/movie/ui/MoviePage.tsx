import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '@shared/ui/LoadingSpinner';
import { ErrorState } from '@shared/ui/ErrorState';
import { useMovie } from '../hooks/useMovie';
import styles from './MoviePage.module.scss';
import StarIcon from "@shared/assets/icons/star.svg";
import HeartIcon from "@shared/assets/icons/heart.svg";
import HeartActiveIcon from "@shared/assets/icons/heartActive.svg";
import { MovieDetailsSection } from './components/MovieDetailsSection';

const MIN_RATING = 7.0;
const MINUTES_IN_HOUR = 60;

export const MoviePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id || isNaN(parseInt(id))) {
    return <ErrorState error="Некорректный идентификатор фильма" />;
  }

  const movieId = parseInt(id);
  const { movie, isLoading, error, refetch } = useMovie(movieId);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const formatRuntime = (minutes: number | undefined): string => {
    if (!minutes) return 'Не указано';
    const hours = Math.floor(minutes / MINUTES_IN_HOUR);
    const mins = minutes % MINUTES_IN_HOUR;
    return `${hours} ч ${mins} мин`;
  };

  const getRatingClass = (rating: number | undefined): string => {
    return !rating || rating < MIN_RATING ? (styles.lowRating || '') : '';
  };

  const handleTrailerClick = () => {
    if (movie?.trailerUrl) {
      window.open(movie.trailerUrl, '_blank');
    }
  };

  const getSafeValue = (value: string | undefined): string => {
    return value || 'Не указано';
  };

  const getSafeNumber = (value: number | undefined): string => {
    return value ? value.toString() : 'Не указано';
  };

  const getSafeArray = (array: string[] | undefined): string[] => {
    return array || [];
  };

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (isLoading) {
    return <LoadingSpinner message="Загружаем информацию о фильме..." />;
  }

  if (!movie) {
    return <ErrorState error="Фильм не найден" onRetry={refetch} />;
  }

  return (
    <div className={styles.moviePage}>
      <div className={styles.movieContainer}>
        <div className={styles.infoSection}>
          <div className={styles.titleContainer}>
            <div className={styles.header}>
              <div className={styles.ratingRow}>
                <div className={`${styles.rating} ${getRatingClass(movie.tmdbRating)}`}>
                  <img src={StarIcon} alt="Рейтинг" className={styles.ratingIcon} />
                  {movie.tmdbRating ? movie.tmdbRating.toFixed(1) : 'N/A'}
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>{getSafeNumber(movie.releaseYear)}</span>
                  <span className={styles.metaItem}>{getSafeArray(movie.genres)[0] || 'Жанр'}</span>
                  <span className={styles.metaItem}>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>

              <h1 className={styles.title}>{getSafeValue(movie.title)}</h1>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className={styles.originalTitle}>{movie.originalTitle}</p>
              )}
              <p className={styles.description}>{getSafeValue(movie.plot)}</p>
            </div>

            <div className={styles.actions}>
              <button 
                className={styles.trailerButton}
                onClick={handleTrailerClick}
                disabled={!movie.trailerUrl}
              >
                Трейлер
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
            </div>
          </div>

          <MovieDetailsSection
            language={getSafeValue(movie.language)}
            budget={getSafeValue(movie.budget)}
            revenue={getSafeValue(movie.revenue)}
            director={getSafeValue(movie.director)}
            production={getSafeValue(movie.production)}
            awardsSummary={getSafeValue(movie.awardsSummary)}
          />

          {getSafeArray(movie.cast).length > 0 && (
            <div className={styles.castSection}>
              <h3 className={styles.castTitle}>В главных ролях</h3>
              <div className={styles.castList}>
                {getSafeArray(movie.cast).slice(0, 10).map((actor, index) => (
                  <span key={index} className={styles.castItem}>
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.posterSection}>
          <img
            src={movie.posterUrl || ''}
            alt={movie.title || 'Фильм'}
            className={styles.poster}
          />
        </div>
      </div>
    </div>
  );
};