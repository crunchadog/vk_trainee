import { Link } from "react-router-dom";
import styles from './EmptyFavourites.module.css'

const EmptyFavourites = () => {
    return (
        <div className={styles.empty}>
            <div className={styles.card}>
                <div className={styles.emoji}>🐱</div>
                <h2 className={styles.title}>Пока нет любимых котиков</h2>
                <p className={styles.text}>
                    Добавьте котиков в избранное на странице «Все котики».
                </p>
                <Link to="/" className={styles.button}>
                    Перейти ко всем котикам
                </Link>
            </div>
        </div>
    );
};

export default EmptyFavourites;