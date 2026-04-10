
import styles from './LoadMoreButton.module.css'

interface LoadMoreButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const LoadMoreButton = ({onClick, disabled = false}: LoadMoreButtonProps) => {
    return (
        <div className={styles.wrapper}>
            <button
                type='button'
                className={styles.button}
                onClick={onClick}
                disabled={disabled}
            >
                {disabled ? 'Играемся с мячиком...' : 'Еще котиков?'}
            </button>
        </div>
    );
};

export default LoadMoreButton;