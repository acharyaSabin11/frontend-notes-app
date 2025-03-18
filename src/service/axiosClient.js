import axios from "axios";
import { BASE_URL } from "../utils/constants";
import store from "../store/store";
import { handleLogin, handleLogout } from "../store/authSlice";


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

// let refreshTokenPromise = null;

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
            try {
                const response = await client.post("/refresh");
                if (response.status === 200) {
                    store.dispatch(handleLogin(response.data));
                    error.response.config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
                    return axios(error.response.config);
                }
                else {
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                if (refreshError.status === 400) {
                    store.dispatch(handleLogout());
                }
                return Promise.reject(refreshError);
            } finally {
                createAxiosResponseInterceptor();
            }


        }
    );
}


// function createAxiosResponseInterceptor() {
//     const interceptor = client.interceptors.response.use(
//         (response) => {
//             return response;
//         },
//         async (error) => {
//             if (error.response.status !== 401) {
//                 return Promise.reject(error);
//             }
//             if (!refreshTokenPromise) {
//                 refreshTokenPromise = client.post("/refresh").then((response) => {
//                     store.dispatch(handleLogin(response.data));
//                     return response;
//                 }).catch((error) => {
//                     return Promise.reject(error);
//                 }).finally(() => {
//                     refreshTokenPromise = null;
//                 });
//             }
//             try {
//                 const response = await refreshTokenPromise;
//                 error.response.config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
//                 return client(error.response.config);
//             }
//             catch (refreshError) {
//                 return Promise.reject(refreshError);
//             }
//         }
//     );
// }

createAxiosResponseInterceptor();


export default client;