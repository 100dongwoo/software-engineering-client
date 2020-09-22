let url = 'http://localhost:8000/';
url = 'http://52.79.190.186/';

if (process.env.NODE_ENV === 'production') {
    url = 'http://52.79.190.186/';
}

export const BASE_URL = url;
