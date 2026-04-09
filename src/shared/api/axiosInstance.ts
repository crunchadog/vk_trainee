import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    headers: {
        'x-api-key': 'live_oKZqGSEskRHhH8pGjaAWIqkb6tNp1kymnAYJVaMx1IAug8hu8euKJwxinra2Vd1K',
    },
})