import { useCallback } from 'react';
import './Button.scss';

const Button = ({
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
    'button',
    `button--${variant}`,
    fullWidth ? 'button--full-width' : '',
    disabled ? 'button--disabled' : '',
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

export default Button;

