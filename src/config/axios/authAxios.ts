import Axios from 'axios';
import {AuthToken} from "../auth/authToken";

const authAxios = Axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}/api` })

authAxios.interceptors.request.use(
    async function (options) {
        const token = AuthToken.get();

        if (token) {
            // @ts-ignore
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        return options;
    },
    function (error) {
        console.log('Request error: ', error);
        return Promise.reject(error);
    },
);

export default authAxios;
