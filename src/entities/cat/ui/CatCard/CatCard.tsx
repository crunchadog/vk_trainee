import {useRef, useState} from "react";
import {CSSTransition} from 'react-transition-group';

import styles from "./CatCard.module.css";
import type {Cat} from "../../model/types.ts";
import {Heart} from "lucide-react";

interface CatCardProps {
    cat: Cat;
    isFavourite?: boolean;
    onToggleFavourite?: (cat: Cat) => void;
    onOpenCatPage?: (cat: Cat) => void;
}

const CatCard = ({
                     cat,
                     isFavourite,
                     onToggleFavourite,
                     onOpenCatPage
                 }: CatCardProps) => {
    const [loaded, setLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [localFavourite, setLocalFavourite] = useState(false);

    const heartRef = useRef<HTMLButtonElement>(null);

    const isControlled = typeof onToggleFavourite === "function";
    const favourite = isControlled ? !!isFavourite : localFavourite;

    const hasHover = window.matchMedia("(hover: hover)").matches;

    const handleToggleFavourite = () => {
        if (onToggleFavourite) {
            onToggleFavourite(cat);
            return;
        }

        setLocalFavourite(prev => !prev);
    };

    const handleOpenCatPage = () => {
        if (onOpenCatPage) {
            onOpenCatPage(cat);
        }
    };

    const showHeart = !hasHover || isHovered || favourite;
    const showOpenButton = !hasHover || isHovered;

    return (
        <article
            className={`${styles.catItem} ${isHovered ? styles.cardHovered : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onDoubleClick={() => handleToggleFavourite()}
        >
            {!loaded && <div className={styles.skeleton}/>}
            <img
                src={cat.url}
                alt='cat'
                loading='lazy'
                decoding='async'
                className={`${styles.image} ${loaded ? styles.visible : styles.hidden}`}
                onLoad={() => setLoaded(true)}
            />

            <div className={styles.overlay}/>

            <CSSTransition
                in={showHeart}
                timeout={180}
                mountOnEnter
                unmountOnExit
                nodeRef={heartRef}
                classNames={{
                    enter: styles.heartEnter,
                    enterActive: styles.heartEnterActive,
                    exit: styles.heartExit,
                    exitActive: styles.heartExitActive
                }}
            >
                <button
                    ref={heartRef}
                    type='button'
                    className={`${styles.heartButton} ${favourite ? styles.heartButtonActive : ''}`}
                    aria-label={
                        favourite ? "Убрать котика из избранного" : "Добавить котика в избранное"
                    }
                    onClick={handleToggleFavourite}
                >
                    <Heart className={styles.heartIcon} size={24}/>
                </button>
            </CSSTransition>

            {showOpenButton && onOpenCatPage && (
                <button
                    type='button'
                    className={styles.openButton}
                    onClick={handleOpenCatPage}
                >
                    Перейти к котику
                </button>
            )}
        </article>
    );
};

export default CatCard;

