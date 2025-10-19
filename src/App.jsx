import { useState, useCallback } from 'react';
import HomePage from './pages/HomePage/HomePage';
import { fetchTopMovies, fetchRandomMovie } from './api/api';
import './styles/global.scss';

function App() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTopMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const movies = await fetchTopMovies();
      setTopMovies(movies);
    } catch (error) {
      console.error('Ошибка загрузки топ фильмов:', error);
    }
    setIsLoading(false);
  }, []);

  const loadRandomMovie = useCallback(async () => {
    try {
      const movie = await fetchRandomMovie();
      setRandomMovie(movie);
    } catch (error) {
      console.error('Ошибка загрузки случайного фильма:', error);
    }
  }, []);

  const handleGetRandomMovie = useCallback(async () => {
    await loadRandomMovie();
  }, [loadRandomMovie]);

  const handleMovieClick = useCallback((movieId) => {
    console.log('Клик по фильму:', movieId);
  }, []);

  if (topMovies.length === 0 && !isLoading) {
    loadTopMovies();
    if (!randomMovie) {
      loadRandomMovie();
    }
  }

  return (
    <div className="app">
      <HomePage
        randomMovie={randomMovie}
        topMovies={topMovies}
        onGetRandomMovie={handleGetRandomMovie}
        onMovieClick={handleMovieClick}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
