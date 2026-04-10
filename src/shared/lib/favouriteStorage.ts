import type {Cat} from "../../entities/cat/model/types.ts";

const FAVOURITE_KEY = 'favourite_cats';

export const loadFavouriteCats = (): Cat[] => {
    try {
        const local = localStorage.getItem(FAVOURITE_KEY);

        if (!local) {
            return [];
        }

        const parsed = JSON.parse(local);

        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export const saveFavouriteCats = (cats: Cat[]) => {
    try {
        localStorage.setItem(FAVOURITE_KEY, JSON.stringify(cats));
    } catch {
        console.error(":(");
    }
};