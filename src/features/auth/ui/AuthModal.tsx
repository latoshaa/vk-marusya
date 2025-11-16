import { FC, useState } from 'react';
import { useAuth } from '@shared/lib/AuthContext';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { SuccessRegistration } from './SuccessRegistration';
import styles from './AuthModal.module.scss';
import CrossIcon from "@shared/assets/icons/cross.svg";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'register';
}

type ViewType = 'login' | 'register' | 'success';

export const AuthModal: FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultView = 'login' 
}) => {
  const [currentView, setCurrentView] = useState<ViewType>(defaultView);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, register, checkAuth } = useAuth();

  if (!isOpen) return null;

  const getModalClass = () => {
    switch (currentView) {
      case 'login':
        return styles.login;
      case 'register':
        return styles.registration;
      case 'success':
        return styles.success;
      default:
        return '';
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(email, password);
      await checkAuth();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, name: string, surname: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await register(email, password, name, surname);
      setCurrentView('success');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessLogin = () => {
    setCurrentView('login');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={`${styles.modalContent} ${getModalClass()}`}>
        <button className={styles.closeButton} onClick={onClose}>
          <div className={styles.closeIcon}>
            <img src={CrossIcon} alt="Закрыть" />
          </div>
        </button>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {currentView === 'login' && (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView('register')}
            isLoading={isLoading}
          />
        )}

        {currentView === 'register' && (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentView('login')}
            isLoading={isLoading}
          />
        )}

        {currentView === 'success' && (
          <SuccessRegistration onLogin={handleSuccessLogin} />
        )}
      </div>
    </div>
  );
};