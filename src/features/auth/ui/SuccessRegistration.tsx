import { FC } from 'react';
import styles from './AuthForms.module.scss';
import MarusyaLogo from "@shared/assets/icons/marusya.png";

interface SuccessRegistrationProps {
  onLogin: () => void;
}

export const SuccessRegistration: FC<SuccessRegistrationProps> = ({ onLogin }) => {
  return (
    <div className={styles.successContainer}>
      <div className={styles.logo}>
        <img src={MarusyaLogo} alt="Маруся" />
      </div>

      <h2 className={styles.successTitle}>Регистрация завершена</h2>
      <p className={styles.successText}>
        Используйте вашу электронную почту для входа
      </p>
      <button 
        onClick={onLogin}
        className={styles.submitButton}
      >
        <span className={styles.submitButtonText}>Войти</span>
      </button>
    </div>
  );
};