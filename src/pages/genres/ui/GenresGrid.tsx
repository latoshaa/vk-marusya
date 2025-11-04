import { FC } from 'react';
import { Genre } from '@shared/types/genre';
import { GenreCard } from './GenreCard';
import styles from './GenresGrid.module.scss';

interface GenresGridProps {
  genres: Genre[];
}

export const GenresGrid: FC<GenresGridProps> = ({ genres }) => {
  const firstRow = genres.slice(0, 4);
  const secondRow = genres.slice(4, 8);

  return (
    <div className={styles.genresGrid}>
      <div className={styles.gridRow}>
        {firstRow.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
      <div className={styles.gridRow}>
        {secondRow.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
};