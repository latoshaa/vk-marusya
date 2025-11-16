import { FC, useState } from 'react';
import styles from './AuthForms.module.scss';
import MarusyaLogo from "@shared/assets/icons/marusya.png";
import EmailIcon from "@shared/assets/icons/email.svg";
import UserIcon from "@shared/assets/icons/user.svg";
import PasswordIcon from "@shared/assets/icons/password.svg";

interface RegisterFormProps {
  onRegister: (email: string, password: string, name: string, surname: string) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
}

export const RegisterForm: FC<RegisterFormProps> = ({ 
  onRegister, 
  onSwitchToLogin, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};

    if (!formData.email.trim()) {
      newErrors.email = true;
    }

    if (!formData.name.trim()) {
      newErrors.name = true;
    }

    if (!formData.surname.trim()) {
      newErrors.surname = true;
    }

    if (!formData.password) {
      newErrors.password = true;
    }

    if (!formData.confirmPassword || formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        await onRegister(formData.email, formData.password, formData.name, formData.surname);
      } catch (error) {
      }
    }
  };

  const getIcon = (field: string) => {
    switch (field) {
      case 'email':
        return EmailIcon;
      case 'name':
      case 'surname':
        return UserIcon;
      case 'password':
      case 'confirmPassword':
        return PasswordIcon;
      default:
        return '';
    }
  };

  const getPlaceholder = (field: string) => {
    switch (field) {
      case 'email':
        return 'Электронная почта';
      case 'name':
        return 'Имя';
      case 'surname':
        return 'Фамилия';
      case 'password':
        return 'Пароль';
      case 'confirmPassword':
        return 'Подтвердите пароль';
      default:
        return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.registerForm}`}>
      <div className={styles.logo}>
        <img src={MarusyaLogo} alt="Маруся" />
      </div>

      <h2 className={styles.title}>Регистрация</h2>

      <div className={`${styles.fieldsWrapper} ${styles.registerFields}`}>
        {['email', 'name', 'surname', 'password', 'confirmPassword'].map((field) => (
          <div key={field} className={styles.field}>
            <div className={`${styles.inputContainer} ${errors[field] ? styles.error : ''}`}>
              <div className={styles.icon}>
                <img src={getIcon(field)} alt={field} />
              </div>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                placeholder={getPlaceholder(field)}
                value={formData[field as keyof typeof formData]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={styles.input}
                disabled={isLoading}
              />
            </div>
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        <span className={styles.submitButtonText}>
          {isLoading ? 'Регистрация...' : 'Создать аккаунт'}
        </span>
      </button>

      <button 
        type="button" 
        onClick={onSwitchToLogin}
        className={styles.switchButton}
        disabled={isLoading}
      >
        У меня есть пароль
      </button>
    </form>
  );
}