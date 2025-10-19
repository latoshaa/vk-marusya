import { useCallback } from 'react';
import Button from '../../components/Button/Button';
import MovieCard from '../../components/MovieCard/MovieCard';
import './HomePage.scss';

const HomePage = ({
  randomMovie,
  topMovies,
  onGetRandomMovie,
  onMovieClick,
  isLoading,
}) => {
  const handleRandomClick = useCallback(() => {
    onGetRandomMovie();
  }, [onGetRandomMovie]);

  return (
    <div className="home-page">
      <section className="hero">
        {randomMovie && (
          <div
            className="hero__background"
            style={{ backgroundImage: `url(${randomMovie.backdropUrl})` }}
          >
            <div className="hero__overlay" />
            <div className="container">
              <div className="hero__content">
                <h1 className="hero__title">{randomMovie.title}</h1>
                <div className="hero__meta">
                  <span className="hero__year">{randomMovie.releaseYear}</span>
                  <span className="hero__rating">
                    ⭐ {randomMovie.tmdbRating.toFixed(1)}
                  </span>
                  <span className="hero__runtime">{randomMovie.runtime} мин</span>
                </div>
                <p className="hero__plot">{randomMovie.plot}</p>
                <div className="hero__genres">
                  {randomMovie.genres.map((genre) => (
                    <span key={genre} className="hero__genre">
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="hero__actions">
                  <Button variant="outline" onClick={handleRandomClick}>
                    🎲 Другой фильм
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!randomMovie && !isLoading && (
          <div className="hero__empty">
            <div className="container">
              <h1>Добро пожаловать в VK Маруся</h1>
              <p>Откройте для себя лучшие фильмы</p>
              <Button onClick={handleRandomClick}>🎲 Случайный фильм</Button>
            </div>
          </div>
        )}
      </section>

      <section className="top-section">
        <div className="container">
          <div className="top-section__header">
            <h2 className="top-section__title">Топ 10 фильмов по IMDb</h2>
          </div>
          <div className="movie-grid">
            {topMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={onMovieClick}
              />
            ))}
          </div>
          {isLoading && (
            <div className="loading">Загрузка...</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

