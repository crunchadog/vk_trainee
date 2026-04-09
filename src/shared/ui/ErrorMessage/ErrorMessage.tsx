import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.emoji}>😿</span>
            <h2 className={styles.title}>Что-то пошло не так. Наши котики идут разбираться</h2>
            <p className={styles.text}>Не удалось загрузить котиков. Они сейчас уснули :(</p>
        </div>
    );
};

export default ErrorMessage;