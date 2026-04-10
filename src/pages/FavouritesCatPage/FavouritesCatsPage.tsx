import {useCallback} from "react";

import CatGrid from "../../entities/cat/ui/CatGrid/CatGrid.tsx";
import EmptyFavourites from "../EmptyFavourites/EmptyFavourites.tsx";

import {useAppDispatch, useAppSelector} from "../../shared/lib/hooks.ts";
import {toggleFavourite} from "../../entities/cat/model/catSlice.ts";

import styles from './FavouritesCatsPage.module.css'
import type {Cat} from "../../entities/cat/model/types.ts";
import {useNavigate} from "react-router-dom";

const FavouritesCatsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { favouriteCats } = useAppSelector(state => state.cats);

    const onOpenCatPage = (cat: Cat) => {
        navigate(`/cats/${cat.id}`)
    }

    const handleToggleFavourite = useCallback((cat: Cat) => {
        dispatch(toggleFavourite(cat));
    }, [toggleFavourite])

    return (
        <section className={styles.favouritesPage}>
            {favouriteCats.length > 0 ? (
                <CatGrid
                    cats={favouriteCats}
                    favouriteIds={favouriteCats.map(item => item.id)}
                    onToggleFavourite={handleToggleFavourite}
                    onOpenCatPage={onOpenCatPage}
                />
            ) : (
                <EmptyFavourites />
            )}
        </section>
    );
};

export default FavouritesCatsPage;