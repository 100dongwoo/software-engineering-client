import { create } from 'apisauce';
import { BASE_URL } from './urls';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const api = create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const extraApi = create({ baseURL: BASE_URL });

api.addResponseTransform((response) => {
    console.log(response);
    if (response.status && response.status >= 500) {
        throw 'Server Error';
    } else if (!response.status) {
        throw 'API Error';
    } else {
        if (response.data instanceof Object) {
            response.data = camelcaseKeys(response.data, { deep: true });
        }

        if (response.data && response.data.message instanceof Object) {
            response.data.message = camelcaseKeys(response.data.message, {
                deep: true,
            });
            response.errors = response.data.message;
        }
    }
});

api.addRequestTransform((request) => {
    if (request.params instanceof Object) {
        request.params = snakecaseKeys(request.params, { deep: true });
    }
    if (
        request.data instanceof Object &&
        request.data.constructor.name === 'Object'
    ) {
        request.data = snakecaseKeys(request.data, { deep: true });
    }
});

export default api;
