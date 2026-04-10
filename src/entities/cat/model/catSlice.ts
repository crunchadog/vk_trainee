import type {Cat, ProcessState} from "./types.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {http} from "../../../shared/api/axiosInstance.ts";

interface CatState {
    cats: Cat[];
    process: ProcessState;
    page: number;
    favouriteCats: Cat[];
}

const initialState: CatState = {
    cats: [],
    process: 'waiting',
    page: 1,
    favouriteCats: [],
}

export const fetchCats = createAsyncThunk<Cat[], number>(
    'cats/fetchCats',
    async (page: number, { signal }) => {
        const {data} = await http.get<Cat[]>('/images/search', {
            params: {
                limit: 15,
                page,
                has_breeds: 1
            },
            signal,
        });

        return data;
    }
)

const catSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        setProcess: (state, action: PayloadAction<ProcessState>) => {
            state.process = action.payload;
        },
        incrementPage(state) {
            state.page += 1;
        },
        toggleFavourite: (state, action: PayloadAction<Cat>) => {
            const currentCat = action.payload;
            const exists = state.favouriteCats.some((cat) => cat.id === currentCat.id);

            if (exists) {
                state.favouriteCats = state.favouriteCats.filter((cat) => cat.id !== currentCat.id);
            } else {
                state.favouriteCats.push(currentCat);
            }
        },
        toStorageFavourites: (state, action: PayloadAction<Cat[]>) => {
            state.favouriteCats = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCats.pending, (state) => {
                state.process = 'loading';
            })
            .addCase(fetchCats.fulfilled, (state, action) => {
                state.process = 'confirmed';
                state.cats = [...state.cats, ...action.payload];
            })
            .addCase(fetchCats.rejected, (state, action) => {
                if (action.meta.aborted) return;
                state.process = 'error';
            })
    },
})

export const {
    incrementPage,
    toggleFavourite,
    toStorageFavourites,
    setProcess,
} = catSlice.actions;

export default catSlice.reducer;