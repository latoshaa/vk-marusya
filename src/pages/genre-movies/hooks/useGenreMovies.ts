import { useState, useEffect, useCallback } from 'react';
import { Movie } from '@shared/types/movie';
import { fetchMoviesByGenre } from '@shared/api/movieApi';

const MOVIES_PER_PAGE = 15;

export const useGenreMovies = (genreId: number) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadAllMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const moviesData = await fetchMoviesByGenre(genreId);
      setAllMovies(moviesData);

      setDisplayedMovies(moviesData.slice(0, MOVIES_PER_PAGE));
      setHasMore(moviesData.length > MOVIES_PER_PAGE);
      setCurrentPage(1);
      
    } catch (err) {
      setError('Не удалось загрузить фильмы');
      console.error('Ошибка загрузки фильмов:', err);
    } finally {
      setIsLoading(false);
    }
  }, [genreId]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      const startIndex = (nextPage - 1) * MOVIES_PER_PAGE;
      const endIndex = startIndex + MOVIES_PER_PAGE;
      
      const nextMovies = allMovies.slice(startIndex, endIndex);
      setDisplayedMovies(prev => [...prev, ...nextMovies]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < allMovies.length);
    }
  }, [isLoading, hasMore, currentPage, allMovies]);

  useEffect(() => {
    setAllMovies([]);
    setDisplayedMovies([]);
    setCurrentPage(1);
    setHasMore(true);
    loadAllMovies();
  }, [genreId, loadAllMovies]);

  return { 
    movies: displayedMovies, 
    isLoading, 
    error, 
    hasMore, 
    loadMore,
    refetch: loadAllMovies
  };
};