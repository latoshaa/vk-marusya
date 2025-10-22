import { FC } from 'react';
import styles from './Header.module.scss';
import MarusyaLogo from '../../assets/marusya-white.svg';
import SearchIcon from '../../assets/search.svg';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img 
            src={MarusyaLogo} 
            alt="Маруся" 
            className={styles.logoImage}
          />
        </div>

        <div className={styles.centerWrapper}>
          <nav className={styles.nav}>
            <a href="/" className={`${styles.navLink} ${styles.active}`}>
              Главная
            </a>
            <a href="/genres" className={styles.navLink}>
              Жанры
            </a>
          </nav>

          <div className={styles.searchInput}>
            <img 
              src={SearchIcon} 
              alt="Поиск" 
              className={styles.searchIcon}
            />
            <input 
              type="text" 
              placeholder="Поиск" 
              className={styles.searchField}
            />
          </div>
        </div>

        <a href="/login" className={styles.navLink}>
          Войти
        </a>
      </div>
    </header>
  );
};