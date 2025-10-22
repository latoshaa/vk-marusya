import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '../widgets/header';
import { Footer } from "../widgets/footer";
import { HomePage } from '../pages/home';
import { fetchTopMovies, fetchRandomMovie } from '../components/movie/model/api';
import { Movie } from '../components/movie/model/types';
import '../shared/styles/global.scss';

function App() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTopMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const movies = await fetchTopMovies();
      setTopMovies(movies);
    } catch (error) {
      console.error('Ошибка загрузки топ фильмов:', error);
    } finally {
      setIsLoading(false);
    }
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

  const handleMovieClick = useCallback((movieId: number) => {
    console.log('Клик по фильму:', movieId);
  }, []);

  useEffect(() => {
    if (topMovies.length === 0 && !isLoading) {
      loadTopMovies();
      if (!randomMovie) {
        loadRandomMovie();
      }
    }
  }, [topMovies.length, isLoading, loadTopMovies, loadRandomMovie, randomMovie]);

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage
                  randomMovie={randomMovie}
                  topMovies={topMovies}
                  onGetRandomMovie={handleGetRandomMovie}
                  onMovieClick={handleMovieClick}
                  isLoading={isLoading}
                />
              } 
            />
            <Route path="/genres" element={<div>Страница жанров</div>} />
            <Route path="/movie/:id" element={<div>Страница фильма</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


