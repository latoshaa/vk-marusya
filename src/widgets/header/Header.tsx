import { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import MarusyaLogo from "@shared/assets/icons/marusya-white.svg";
import SearchIcon from "@shared/assets/icons/search.svg";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link to="/">
            <img 
              src={MarusyaLogo} 
              alt="Маруся" 
              className={styles.logoImage}
            />
          </Link>
        </div>

        <div className={styles.centerWrapper}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <NavLink 
                  to="/" 
                  className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/genres" 
                  className={`${styles.navLink} ${location.pathname === '/genres' ? styles.active : ''}`}
                >
                  Жанры
                </NavLink>
              </li>
            </ul>
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

        <Link to="/login" className={`${styles.navLink} ${styles.loginLink}`}>
          Войти
        </Link>
      </div>
    </header>
  );
};