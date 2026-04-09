import type {Cat, ProcessState} from "./types.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {http} from "../../../shared/api/axiosInstance.ts";

interface CatState {
    cats: Cat[];
    process: ProcessState;
    page: number;
}

const initialState: CatState = {
    cats: [],
    process: 'loading',
    page: 1,
}

export const fetchCats = createAsyncThunk(
    'cats/fetchCats',
    async (page: number) => {
        const {data} = await http.get<Cat[]>('/images/search', {
            params: {limit: 15, page},
        });

        return data;
    }
)

const catSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        incrementPage(state) {
            state.page += 1;
        },
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
            .addCase(fetchCats.rejected, (state) => {
                state.process = 'error';
            })
    },
})

export const { incrementPage } = catSlice.actions;
export default catSlice.reducer;