import { useState, useEffect } from "react";
import { Genre } from '@shared/types/genre';
import { fetchGenres } from '@shared/api/genreApi';

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGenres = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const genresData = await fetchGenres();
      setGenres(genresData);
    } catch (err) {
      setError('Не удалось загрузить список жанров');
      console.error('Ошибка загрузки жанров:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  return { genres, isLoading, error, refetch: loadGenres };
};