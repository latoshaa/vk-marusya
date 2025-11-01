import { FC } from 'react';
import styles from '../Hero.module.scss';
import RandomIcon from "@shared/assets/icons/random.svg";

interface HeroEmptyProps {
  onGetRandomMovie: () => void;
  isLoading?: boolean;
}

export const HeroEmpty: FC<HeroEmptyProps> = ({ onGetRandomMovie, isLoading }) => {
  return (
    <div className={styles.heroEmpty}>
      <div className={styles.heroEmptyContent}>
        <h1 className={styles.heroEmptyTitle}>Welcome</h1>
        <p className={styles.heroEmptyText}>The best films</p>
        <button 
          className={styles.randomButton}
          onClick={onGetRandomMovie}
          disabled={isLoading}
        >
          <img src="/src/shared/assets/random.svg" alt="Случайный фильм" />
        </button>
      </div>
    </div>
  );
};