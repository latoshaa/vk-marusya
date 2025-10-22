import { FC } from 'react';
import { Hero } from '../../widgets/hero';
import { MovieGrid } from '../../widgets/movie-grid';
import { Movie } from '../../components/movie/model/types';
import styles from './HomePage.module.scss';

interface HomePageProps {
  randomMovie?: Movie | null;
  topMovies: Movie[];
  onGetRandomMovie: () => void;
  onMovieClick: (movieId: number) => void;
  isLoading?: boolean;
}

export const HomePage: FC<HomePageProps> = ({
  randomMovie,
  topMovies,
  onGetRandomMovie,
  onMovieClick,
  isLoading = false,

}) => {
  return (
    <div className={styles.homepage}>
      <Hero
        movie={randomMovie}
        onGetRandomMovie={onGetRandomMovie}
        isLoading={isLoading}
        />

        <MovieGrid
        movies={topMovies}
        onMovieClick={onMovieClick}
        title="Топ 10 фильмов"
        />

    </div>
  )
}

