import client from "./axiosClient";

export const login = async ({ username, password }) => {
    const response = await client.post("/auth/login", { username: username.toLowerCase(), password });
    return response.data;
};

export const signup = async ({ username, password }) => {
    const response = await client.post("/auth/signup", { username: username.toLowerCase(), password });
    return response.data;
};

export const logout = async () => {
    const response = await client.post("/auth/logout");
    return response.data;
};

export const refreshTokens = async () => {
    const response = await client.post("/refresh");
    return response.data;
}