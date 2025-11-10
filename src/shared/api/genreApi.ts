import { mockGenres } from './mock/genres';
import { Genre } from '../types/genre';

export const fetchGenres = async (): Promise<Genre[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockGenres), 500);
  });
};

export const fetchGenreById = async (id: number): Promise<Genre> => {
  const genre = mockGenres.find(g => g.id === id);
  if (!genre) {
    throw new Error('Жанр не найден');
  }
  return genre;
};