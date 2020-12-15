let url = 'http://localhost:8000/';
// url = 'http://192.168.35.18:8000/';
// url = 'http://www.m-ssi.com:8000/';
url = 'http://www.man-ssi.com:8000/';

if (process.env.NODE_ENV === 'production') {
    url = 'http://www.man-ssi.com:8000/';
}

export const BASE_URL = url + 'api/';
