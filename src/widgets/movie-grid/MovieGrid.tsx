import { FC } from 'react';
import { Movie } from '../../components/movie/model/types';
import { MovieCard } from '../../components/movie/ui/MovieCard';
import styles from './MovieGrid.module.scss';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
  title?: string;
}

export const MovieGrid: FC<MovieGridProps> = ({ 
  movies, 
  onMovieClick, 
  title = "Топ 10 фильмов" 
}) => {
  const firstRow = movies.slice(0, 5);
  const secondRow = movies.slice(5, 10);

  return (
    <section className={styles.movieGridSection}>
      <div className={styles.container}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
          </div>
        )}
        
        <div className={styles.gridWrapper}>
          <div className={styles.gridRow}>
            {firstRow.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                number={index + 1}
                onClick={onMovieClick}
              />
            ))}
          </div>

          <div className={styles.gridRow}>
            {secondRow.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                number={index + 6}
                onClick={onMovieClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};