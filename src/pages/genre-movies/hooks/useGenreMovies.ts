import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@shared/types/movie';
import { fetchMoviesByGenre } from '@shared/api/movieApi';

const MOVIES_PER_PAGE = 15;

export const useGenreMovies = (genreId: number) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const hasMore = currentPage * MOVIES_PER_PAGE < allMovies.length;

  const loadAllMovies = useCallback(async () => {
    if (!genreId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const moviesData = await fetchMoviesByGenre(genreId);
      setAllMovies(moviesData);

      setDisplayedMovies(moviesData.slice(0, MOVIES_PER_PAGE));
      setCurrentPage(1);
      
    } catch (err) {
      setError('Не удалось загрузить фильмы');
      console.error('Ошибка загрузки фильмов:', err);
    } finally {
      setIsLoading(false);
    }
  }, [genreId]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading) return;

      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * MOVIES_PER_PAGE;
      
      setDisplayedMovies(allMovies.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
  }, [isLoading, hasMore, currentPage, allMovies]);

  useEffect(() => {
    loadAllMovies();
  }, [loadAllMovies]);

  return { 
    movies: displayedMovies, 
    isLoading, 
    error, 
    hasMore, 
    loadMore,
    refetch: loadAllMovies
  };
};