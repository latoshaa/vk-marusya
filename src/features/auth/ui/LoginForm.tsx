import { FC, useState } from 'react';
import styles from './AuthForms.module.scss';
import MarusyaLogo from "@shared/assets/icons/marusya.png";
import EmailIcon from "@shared/assets/icons/email.svg";
import PasswordIcon from "@shared/assets/icons/password.svg";

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSwitchToRegister: () => void;
  isLoading?: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ 
  onLogin, 
  onSwitchToRegister, 
  isLoading = false 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});

  const validate = () => {
    const newErrors: { email?: boolean; password?: boolean } = {};

    if (!email.trim()) {
      newErrors.email = true;
    }

    if (!password) {
      newErrors.password = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        await onLogin(email, password);
      } catch (error) {
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.loginForm}`}>
      <div className={styles.logo}>
        <img src={MarusyaLogo} alt="Маруся" />
      </div>

      <div className={`${styles.fieldsWrapper} ${styles.loginFields}`}>
        <div className={styles.field}>
          <div className={`${styles.inputContainer} ${errors.email ? styles.error : ''}`}>
            <div className={styles.icon}>
              <img src={EmailIcon} alt="Email" />
            </div>
            <input
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={styles.input}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={styles.field}>
          <div className={`${styles.inputContainer} ${errors.password ? styles.error : ''}`}>
            <div className={styles.icon}>
              <img src={PasswordIcon} alt="Пароль" />
            </div>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={styles.input}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        <span className={styles.submitButtonText}>
          {isLoading ? 'Вход...' : 'Войти'}
        </span>
      </button>

      <button 
        type="button" 
        onClick={onSwitchToRegister}
        className={styles.switchButton}
        disabled={isLoading}
      >
        Регистрация
      </button>
    </form>
  );
};