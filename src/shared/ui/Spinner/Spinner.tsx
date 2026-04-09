import styles from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinner}/>
            <p className={styles.text}>Собираем всех котиков вместе :)</p>
        </div>
    );
};

export default Spinner;