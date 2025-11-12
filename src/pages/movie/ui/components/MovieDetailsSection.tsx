import { FC } from 'react';
import styles from '../MoviePage.module.scss';

interface MovieDetailsSectionProps {
  language: string;
  budget: string;
  revenue: string;
  director: string;
  production: string;
  awardsSummary: string;
}

export const MovieDetailsSection: FC<MovieDetailsSectionProps> = ({
  language, budget, revenue, director, production, awardsSummary
}) => {
  return (
    <div className={styles.detailsSection}>
      <h2 className={styles.detailsTitle}>О фильме</h2>
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Язык оригинала</span>
          <span className={styles.detailValue}>{language}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Бюджет</span>
          <span className={styles.detailValue}>{budget}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Выручка</span>
          <span className={styles.detailValue}>{revenue}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Режиссёр</span>
          <span className={styles.detailValue}>{director}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Продюсер</span>
          <span className={styles.detailValue}>{production}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Награды</span>
          <span className={styles.detailValue}>{awardsSummary}</span>
        </div>
      </div>
    </div>
  );
};