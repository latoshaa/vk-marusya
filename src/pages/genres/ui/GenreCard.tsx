import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Genre } from '@shared/types/genre';
import styles from './GenreCard.module.scss';

interface GenreCardProps {
  genre: Genre;
}

export const GenreCard: FC<GenreCardProps> = ({ genre }) => {
  return (
    <Link to={`/genres/${genre.id}`} className={styles.genreCard}>
      <div className={styles.imageContainer}>
        <img 
          src={genre.imageUrl} 
          alt={genre.name}
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{genre.name}</h3>
    </Link>
  );
};