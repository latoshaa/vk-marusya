import { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MovieCard } from '@shared/ui/MovieCard';
import { LoadingSpinner } from '@shared/ui/LoadingSpinner';
import { ErrorState } from '@shared/ui/ErrorState';
import { Button } from '@shared/ui/Button';
import { useGenreMovies } from '../hooks/useGenreMovies';
import { fetchGenreById } from '@shared/api/genreApi';
import { Genre } from '@shared/types/genre';
import styles from './GenreMoviesPage.module.scss';
import ChevronIcon from "@shared/assets/icons/chevron.svg";

export const GenreMoviesPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const genreId = parseInt(id || '0');
  
  const { movies, isLoading, error, hasMore, loadMore, refetch } = useGenreMovies(genreId);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [genreLoading, setGenreLoading] = useState(true);

  useEffect(() => {
    const loadGenre = async () => {
      if (genreId) {
        try {
          setGenreLoading(true);
          const genreData = await fetchGenreById(genreId);
          setGenre(genreData);
        } catch (err) {
          console.error('Ошибка загрузки жанра:', err);
        } finally {
          setGenreLoading(false);
        }
      }
    };

    loadGenre();
  }, [genreId]);

  const handleMovieClick = (movieId: number) => {
    console.log('Клик по фильму:', movieId);
  };

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className={styles.genreMoviesPage}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Link to="/genres" className={styles.backLink}>
            <img 
              src={ChevronIcon} 
              alt="Назад к жанрам" 
              className={styles.chevronIcon}
            />
          </Link>
          <h1 className={styles.title}>
            {genreLoading ? 'Загрузка...' : (genre?.name || 'Фильмы жанра')}
          </h1>
        </div>
      </div>

      {movies.length === 0 && !isLoading ? (
        <div className={styles.emptyState}>
          <p>Фильмы этого жанра не найдены</p>
        </div>
      ) : (
        <>
          <div className={styles.moviesGrid}>
            {movies.map((movie, index) => (
              <MovieCard
                key={`${movie.id}-${index}`}
                movie={movie}
                number={index + 1}
                onClick={handleMovieClick}
              />
            ))}
          </div>

          {hasMore && (
            <div className={styles.loadMoreContainer}>
              <Button 
                onClick={loadMore}
                variant="primary"
                className={styles.loadMoreButton}
                disabled={isLoading}
              >
                {isLoading ? 'Загрузка...' : 'Показать ещё'}
              </Button>
            </div>
          )}

          {isLoading && (
            <div className={styles.loadingContainer}>
              <LoadingSpinner message="Загрузка фильмов..." />
            </div>
          )}
        </>
      )}
    </div>
  );
};