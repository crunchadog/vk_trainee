export interface CatBreed {
    id: string;
    name: string;
    origin: string;
    temperament: string;
    life_span: string;
    country_codes: string;
    country_code: string;
    wikipedia_url: string;
    weight: {
        imperial: string;
        metric: string;
    };
}

export interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds?: CatBreed[];
}

export type ProcessState = 'waiting' | 'loading' | 'confirmed' | 'error';