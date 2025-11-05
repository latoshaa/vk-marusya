import { FC, useState, useEffect } from 'react';
import { GenresGrid } from './ui/GenresGrid';
import { Genre } from '@shared/types/genre';
import { fetchGenres } from '@shared/api/genreApi';
import styles from './GenresPage.module.scss';

export const GenresPage: FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGenres = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const genresData = await fetchGenres();
      setGenres(genresData);
    } catch (err) {
      setError('Не удалось загрузить список жанров');
      console.error('Ошибка загрузки жанров:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);


  return (
    <div className={styles.genresPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Жанры фильмов</h1>
      </div>
      <GenresGrid genres={genres} />
    </div>
  );
};