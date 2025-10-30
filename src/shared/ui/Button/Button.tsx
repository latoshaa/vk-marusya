import { FC, useCallback } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'icon';
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
}) => {
  const handleClick = useCallback(() => {
    if (onClick && !disabled) {
      onClick();
    }
  }, [onClick, disabled]);

  const buttonClass = [
    styles.button,
    styles[`button--${variant}`],
    fullWidth ? styles['button--full-width'] : '',
    disabled ? styles['button--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};