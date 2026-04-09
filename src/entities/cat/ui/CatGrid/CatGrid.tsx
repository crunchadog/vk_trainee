import type {Cat} from "../../model/types.ts";
import styles from './CatGrid.module.css'

interface CatGridProp {
    cats: Cat[];
}

const CatGrid = ({ cats }: CatGridProp) => {
    return (
        <div className={styles.catGrid}>
            {cats.map((cat) => (
                <div key={cat.id} className={styles.catItem}>
                    <img
                        src={cat.url}
                        alt='cat'
                        className={styles.catImage}/>
                </div>
            ))}
        </div>
    )
}

export default CatGrid;