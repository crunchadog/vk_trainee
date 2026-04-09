import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {store} from "./store.ts";
import Header from "../widgets/Header/Header.tsx";
import AllCatsPage from "../pages/AllCatsPage/AllCatsPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import FavouritesCatsPage from "../pages/FavouriteCatPage/FavouritesCatsPage.tsx";

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Header /> }>
                    <Route index element={<AllCatsPage />} />
                    <Route path='favourites' element={<FavouritesCatsPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);

export default App;