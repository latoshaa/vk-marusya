import { useState, useEffect } from 'react';
import { Movie } from '@shared/types/movie';
import { fetchMovieById } from '@shared/api/movieApi';

export const useMovie = (movieId: number) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovie = async () => {
    if (!movieId) {
      setIsLoading(false)
      setError('Неверный идентификатор фильма');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const movieData = await fetchMovieById(movieId);
      setMovie(movieData);
    } catch (err) {
      setError('Не удалось загрузить информацию о фильме');
      console.error('Ошибка загрузки фильма:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      loadMovie();
  }, [movieId]);

  return { movie, isLoading, error, refetch: loadMovie };
};