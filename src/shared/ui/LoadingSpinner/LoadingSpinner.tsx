import { FC } from "react";
import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
    message = 'Идет загрузка..'
}) => {
    return (
        <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>{message}</p>
        </div>
    )
}