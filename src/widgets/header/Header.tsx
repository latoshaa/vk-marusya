import { FC, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import MarusyaLogo from "@shared/assets/icons/marusya-white.svg";
import SearchIcon from "@shared/assets/icons/search.svg";
import { useAuth } from '@shared/lib/AuthContext';
import { AuthModal } from '@features/auth/ui/AuthModal';

export const Header: FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
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
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/genres" 
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
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

          {isAuthenticated && user ? (
            <div className={styles.userSection}>
              <Link to="/profile" className={styles.userLink}>
                {user.surname}
              </Link>
              <button 
                onClick={handleLogoutClick}
                className={styles.logoutButton}
              >
                Выйти
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLoginClick}
              className={`${styles.navLink} ${styles.loginLink}`}
            >
              Войти
            </button>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
      />
    </>
  );
};