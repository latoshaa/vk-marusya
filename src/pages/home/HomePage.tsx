import { FC, useState, useEffect } from 'react';
import { Hero } from '@widgets/hero';
import { MovieGrid } from '@widgets/movie-grid';
import { ErrorComponent } from './ui/ErrorComponent';
import { Movie } from '@shared/types/movie';
import { fetchTopMovies, fetchRandomMovie } from '@shared/api/movieApi';
import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRetry = () => {
    setError(null);
    loadTopMovies();
    loadRandomMovie();
  };

  const loadTopMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const movies = await fetchTopMovies();
      setTopMovies(movies);
    } catch (err) {
      setError('Не удалось загрузить топ фильмы. Попробуйте обновить страницу.');
      console.error('Ошибка загрузки топ фильмов:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRandomMovie = async () => {
    setError(null);
    try {
      const movie = await fetchRandomMovie();
      setRandomMovie(movie);
    } catch (err) {
      setError('Не удалось загрузить случайный фильм. Попробуйте еще раз.');
      console.error('Ошибка загрузки случайного фильма:', err);
    }
  };

  const handleGetRandomMovie = async () => {
    await loadRandomMovie();
  };

  const handleMovieClick = (movieId: number) => {
    console.log('Клик по фильму:', movieId);
  };

  useEffect(() => {
    loadTopMovies();
    loadRandomMovie();
  }, []);

  if (error) {
    return <ErrorComponent error={error} onRetry={handleRetry} />;
  }

  return (
    <div className={styles.homepage}>
      <Hero
        movie={randomMovie}
        onGetRandomMovie={handleGetRandomMovie}
        isLoading={isLoading}
      />
      <MovieGrid
        movies={topMovies}
        onMovieClick={handleMovieClick}
        title="Топ 10 фильмов"
      />
    </div>
  );
};