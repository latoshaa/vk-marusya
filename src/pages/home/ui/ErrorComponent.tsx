import { FC } from 'react';
import styles from '../HomePage.module.scss';

interface ErrorComponentProps {
  error: string;
  onRetry: () => void;
}

export const ErrorComponent: FC<ErrorComponentProps> = ({ error, onRetry }) => {
  return (
    <div className={styles.errorContainer}>
      <h2>Произошла ошибка</h2>
      <p>{error}</p>
      <button 
        className={styles.retryButton}
        onClick={onRetry}
      >
        Попробовать снова
      </button>
    </div>
  );
};