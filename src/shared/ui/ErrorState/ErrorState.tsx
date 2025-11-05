import { FC } from "react";
import styles from './ErrorState.module.scss';

interface ErorStateProps {
    error: string;
    onRetry?: () => void;
}

export const ErrorState: FC<ErorStateProps> = ({ error, onRetry }) => {
    return (
        <div className={styles.errorContainer}>
            <h2>Ошибочка..</h2>
            <p>{error}</p>
            {onRetry && (
                <button onClick={onRetry} className={styles.retryButton}>
                Попробовать снова
                </button>
            )}
        </div>
    )
}
