import {useAppDispatch, useAppSelector} from "../../shared/lib/hooks.ts";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import {fetchCats, incrementPage, toggleFavourite} from "../../entities/cat/model/catSlice.ts";
import setContent from "../../shared/lib/setContent.tsx";
import {saveFavouriteCats} from "../../shared/lib/favouriteStorage.ts";
import type {Cat} from "../../entities/cat/model/types.ts";
import LoadMoreButton from "../../shared/ui/LoadMoreButton/LoadMoreButton.tsx";
import {useInfinityScroll} from "../../shared/lib/useInfinityScroll.ts";


const AllCatsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {cats, process, favouriteCats, page} = useAppSelector(state => state.cats);
    const favouriteIds = favouriteCats.map(cat => cat.id);

    const divObserveRef = useRef<HTMLDivElement | null>(null);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        dispatch(incrementPage());
        dispatch(fetchCats(nextPage));
    }

    useEffect(() => {
        const promise = dispatch(fetchCats(1));

        return () => {
            promise.abort();
        }
    }, [dispatch]);

    useEffect(() => {
        saveFavouriteCats(favouriteCats);
    }, [favouriteCats]);

    useInfinityScroll({
        triggerRef: divObserveRef,
        onLoadMore: handleLoadMore,
        canLoad: cats.length > 0 && process !== 'loading' && process !== 'error',
    })

    const onToggleFavourite = (cat: Cat) => {
        dispatch(toggleFavourite(cat))
    }

    const onOpenCatPage = (cat: Cat) => {
        navigate(`/cats/${cat.id}`);
    }

    return (
        <>
            {setContent({
                process,
                cats,
                Component: "grid",
                favouriteIds,
                onToggleFavourite,
                onOpenCatPage
            })}

            {cats.length > 0 && process !== "error" && (
                <>
                    <LoadMoreButton
                        onClick={handleLoadMore}
                        disabled={process === "loading"}
                    />

                    <div
                        ref={divObserveRef}
                        style={{width: "100%", height: "1px"}}
                        aria-hidden='true'
                    />
                </>
            )}
        </>
    );
};

export default AllCatsPage;