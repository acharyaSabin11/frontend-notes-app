import client from "./axiosClient";

export const login = async ({ username, password }) => {
    console.log(username, password);
    const response = await client.post("/auth/login", { username, password });
    return response.data;
};

export const signup = async ({ username, password }) => {
    const response = await client.post("/auth/signup", { username, password });
    return response.data;
};

export const refreshTokens = async () => {
    const response = await client.post("/refresh");
    return response.data;
}