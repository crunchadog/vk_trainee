import styles from './Skeleton.module.css';

const Skeleton = () => {
    return (
        <div className={styles.grid}>
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={styles.card}/>
            ))}
        </div>
    );
};

export default Skeleton;