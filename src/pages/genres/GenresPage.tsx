import { FC } from 'react';
import { GenresGrid } from './ui/GenresGrid';
import { LoadingSpinner } from '@shared/ui/LoadingSpinner';
import { ErrorState } from '@shared/ui/ErrorState';
import { useGenres } from './hooks/useGenres';
import styles from './GenresPage.module.scss';

export const GenresPage: FC = () => {
  const { genres, isLoading, error, refetch } = useGenres();

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (isLoading) {
    return <LoadingSpinner message="Загружаем жанры..." />;
  }

  return (
    <div className={styles.genresPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Жанры фильмов</h1>
      </div>
      <GenresGrid genres={genres} />
    </div>
  );
};