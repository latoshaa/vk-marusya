import { FC } from 'react';
import { Genre } from '@shared/types/genre';
import { GenreCard } from './GenreCard';
import styles from './GenresGrid.module.scss';

interface GenresGridProps {
  genres: Genre[];
}

export const GenresGrid: FC<GenresGridProps> = ({ genres }) => {

  return (
    <div className={styles.genresGrid}>
        {genres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
  );
};