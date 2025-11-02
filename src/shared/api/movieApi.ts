import { api } from './config';
import { Movie } from '@shared/types/movie';

export const fetchTopMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/movie/top10');
  return response.data;
};

export const fetchRandomMovie = async (): Promise<Movie> => {
  const response = await api.get('/movie/random');
  return response.data;
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get(`/movie/search?q=${query}`);
  return response.data;
};