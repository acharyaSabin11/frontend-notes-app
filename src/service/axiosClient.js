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
                console.log(1);
                if (response.status !== 200) {
                    return Promise
                        .reject(error);
                }
                console.log(response.status);
                console.log(2);
                store.dispatch(handleLogin(response.data));
                console.log(3);
                error.response.config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
                console.log(4);
                return client(error.response.config);
            }).catch((err) => {
                console.log("Expired");
                return Promise.reject(err);
            }).finally(setTimeout(createAxiosResponseInterceptor(), 0));

        }
    );
}

createAxiosResponseInterceptor();


export default client;