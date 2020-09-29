let url = 'http://localhost:8000/';

if (process.env.NODE_ENV === 'production') {
    url = 'http://15.164.48.222/';
}

export const BASE_URL = url + 'api/';
