import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks.ts";
import { toggleFavourite } from "../../entities/cat/model/catSlice.ts";
import styles from "./SingleCatPage.module.css";

const SingleCatPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { cats, favouriteCats } = useAppSelector((state) => state.cats);

    const cat = useMemo(() => {
        const foundInCats = cats.find((item) => item.id === id);
        if (foundInCats) {
            return foundInCats;
        }

        return favouriteCats.find((item) => item.id === id);
    }, [cats, favouriteCats, id]);

    const isFavourite = favouriteCats.some((item) => item.id === id);
    const breedInfo = cat?.breeds?.[0];

    const handleToggleFavourite = () => {
        if (!cat) {
            return;
        }

        dispatch(toggleFavourite(cat));
    };

    if (!cat) {
        return (
            <section className={styles.notFound}>
                <div className={styles.notFoundCard}>
                    <h1 className={styles.notFoundTitle}>Котик не найден</h1>
                    <p className={styles.notFoundText}>
                        Возможно, этого котика и вовсе не существовало <span className={styles.emoji}>🙀</span>
                    </p>

                    <div className={styles.notFoundActions}>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={() => navigate(-1)}
                        >
                            Назад
                        </button>

                        <Link to="/" className={styles.secondaryButton}>
                            Ко всем котикам
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.page}>
            <div className={styles.topBar}>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                >
                    ← Назад
                </button>
            </div>

            <div className={styles.layout}>
                <div className={styles.imageCard}>
                    <img src={cat.url} alt="cat" className={styles.image} />
                </div>

                <div className={styles.infoCard}>
                    <p className={styles.label}>Карточка котика</p>
                    <h1 className={styles.title}>Котик #{cat.id}</h1>

                    <div className={styles.infoList}>
                        <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Порода:</span>
                            <span className={styles.infoValue}>
                                {breedInfo?.name ?? "Нет данных"}
                            </span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Регион:</span>
                            <span className={styles.infoValue}>
                                {breedInfo?.origin ?? "Нет данных"}
                            </span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Темперамент:</span>
                            <span className={styles.infoValue}>
                                {breedInfo?.temperament ?? "Нет данных"}
                            </span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Продолжительность жизни:</span>
                            <span className={styles.infoValue}>
                                {breedInfo?.life_span ? `${breedInfo.life_span} лет` : "Нет данных"}
                            </span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Вес:</span>
                            <span className={styles.infoValue}>
                                {breedInfo?.weight?.metric
                                    ? `${breedInfo.weight.metric} кг`
                                    : "Нет данных"}
                            </span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Код страны:</span>
                            <span className={styles.infoValue}>
                                {breedInfo?.country_code ?? "Нет данных"}
                            </span>
                        </div>

                        <div className={styles.infoRow}>
                            <span className={styles.infoKey}>Wikipedia:</span>
                            <span className={styles.infoValue}>
                                {breedInfo?.wikipedia_url ? (
                                    <a
                                        href={breedInfo.wikipedia_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles.link}
                                    >
                                        Открыть статью
                                    </a>
                                ) : (
                                    "Нет данных"
                                )}
                            </span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={`${styles.primaryButton} ${
                                isFavourite ? styles.primaryButtonActive : ""
                            }`}
                            onClick={handleToggleFavourite}
                        >
                            {isFavourite ? "Убрать из любимых" : "Добавить в любимые"}
                        </button>

                        <Link to="/favourites" className={styles.secondaryButton}>
                            Перейти в любимые
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleCatPage;