import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userid: null,
    username: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        handleLogin(state, action) {
            state.isAuthenticated = true;
            state.userid = action.payload.user.id;
            state.username = action.payload.user.username;
            state.accessToken = action.payload.accessToken
        },
        handleLogout(state) {
            Object.assign(state, initialState);
        },
        updateAccessToken(state, action) {
            state.accessToken = action.payload;
        },
    },
});

export const { handleLogin, handleLogout, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;