import { useState, useEffect } from 'react';
import { Genre } from '@shared/types/genre';
import { fetchGenreById } from '@shared/api/genreApi';

export const useGenre = (genreId: number) => {
  const [genre, setGenre] = useState<Genre | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGenre = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const genreData = await fetchGenreById(genreId);
        setGenre(genreData);
      } catch (err) {
        setError('Не удалось загрузить информацию о жанре');
        console.error('Ошибка загрузки жанра:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGenre();
  }, [genreId]);

  return { genre, isLoading, error };
};