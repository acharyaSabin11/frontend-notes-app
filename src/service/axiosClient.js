import axios from "axios";
import { BASE_URL } from "../utils/constants";
import store from "../store/store";
import { handleLogin } from "../store/authSlice";


const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

//adding access token with each request
client.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function createAxiosResponseInterceptor() {
    const interceptor = client.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }
            client.interceptors.response.eject(interceptor);
            return client.post("/refresh").then((response) => {
                if (response.status !== 200) {
                    return Promise.reject(error);
                }
                store.dispatch(handleLogin(response.data));
                error.response.config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
                return client(error.response.config);
            }).catch((err) => {
                return Promise.reject(err);
            }).finally(createAxiosResponseInterceptor);

        }
    );
}

createAxiosResponseInterceptor();


export default client;