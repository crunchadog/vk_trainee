import {CSSTransition, TransitionGroup} from "react-transition-group";

import type {Cat} from "../../model/types.ts";
import styles from "./CatGrid.module.css";
import CatCard from "../CatCard/CatCard.tsx";
import {useRef} from "react";

interface CatGridProp {
    cats: Cat[];
    favouriteIds?: string[];
    onToggleFavourite?: (cat: Cat) => void;
    onOpenCatPage?: (cat: Cat) => void;
}

const CatGrid = ({
                     cats,
                     favouriteIds = [],
                     onToggleFavourite,
                     onOpenCatPage,
                 }: CatGridProp) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    return (
        <TransitionGroup className={styles.catGrid}>
            {cats.map((cat) => (
                <CSSTransition
                    nodeRef={nodeRef}
                    timeout={100}
                    classNames={{
                        exit: styles.cardExit,
                        exitActive: styles.cardExitActive,
                    }}
                >
                    <div ref={nodeRef}>
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            isFavourite={favouriteIds.includes(cat.id)}
                            onToggleFavourite={onToggleFavourite}
                            onOpenCatPage={onOpenCatPage}
                        />
                    </div>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

export default CatGrid;