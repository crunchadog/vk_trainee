import { configureStore } from "@reduxjs/toolkit";

import catReducer from '../entities/cat/model/catSlice.ts'
import {loadFavouriteCats} from "../shared/lib/favouriteStorage.ts";
import type {ProcessState} from "../entities/cat/model/types.ts";


export const store = configureStore({
    reducer: {
        cats: catReducer,
    },
    preloadedState: {
        cats: {
            cats: [],
            process: 'waiting' as ProcessState,
            page: 1,
            favouriteCats: loadFavouriteCats(),
        }
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;