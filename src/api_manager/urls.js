let url = 'http://localhost:8000/';
url = 'http://15.164.48.222:8000/';
url = 'http://www.m-ssi.com:8000/';

if (process.env.NODE_ENV === 'production') {
    url = 'http://www.m-ssi.com:8000/';
}

export const BASE_URL = url + 'api/';
