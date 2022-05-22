import axios from 'axios'

export class AxiosCustom {
    static baseUrl = 'http://localhost:9019';
    static instance = axios.create({
        baseURL: AxiosCustom.baseUrl
    });

    static setToken(AUTH_TOKEN) {
        console.log('setting token');
        // reset the fucking token before setting again -_-
        if (AxiosCustom.instance.defaults.headers.common['Authorization']) AxiosCustom.instance.defaults.headers.common['Authorization'] = undefined;
        AxiosCustom.instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
    }

    static resetToken() {
        console.log('resetting the token')
        AxiosCustom.instance.defaults.headers.common['Authorization'] = undefined;
    }

    static getToken() {
        return AxiosCustom.instance.defaults.headers.common['Authorization'];
    }
}

export default AxiosCustom.instance;