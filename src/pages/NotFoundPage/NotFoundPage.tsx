import styles from './NotFoundPage.module.css'
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className={styles.notFound}>
            <span className={styles.emoji}>😺</span>
            <h2 className={styles.notFoundText}>Наших котиков здесь нет<br/>Они греют мордочки в другом месте.</h2>
            <Link to={'/'} className={styles.btn}>Вернуться</Link>
        </div>
    );
};

export default NotFoundPage;