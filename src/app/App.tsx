import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "../widgets/Header/Header.tsx";
import AllCatsPage from "../pages/AllCatsPage/AllCatsPage.tsx";
import SingleCatPage from "../pages/SingleCatPage/SingleCatPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import FavouritesCatsPage from "../pages/FavouritesCatPage/FavouritesCatsPage.tsx";
import {useAppDispatch, useAppSelector} from "../shared/lib/hooks.ts";
import {loadFavouriteCats, saveFavouriteCats} from "../shared/lib/favouriteStorage.ts";
import {toStorageFavourites} from "../entities/cat/model/catSlice.ts";


const App = () => {
    const dispatch = useAppDispatch();
    const {favouriteCats} = useAppSelector(state => state.cats);
    useEffect(() => {
        const storedFavourites = loadFavouriteCats();
        console.log("в localStorage", storedFavourites);
        dispatch(toStorageFavourites(storedFavourites));
    }, [dispatch])

    useEffect(() => {
        saveFavouriteCats(favouriteCats);
    }, [favouriteCats]);


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Header/>}>
                    <Route index element={<AllCatsPage/>}/>
                    <Route path='favourites' element={<FavouritesCatsPage/>}/>
                    <Route path='cats/:id' element={<SingleCatPage/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default App;