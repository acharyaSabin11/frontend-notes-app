import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userid: null,
    username: null,
    accessToken: null,
    expired: null,
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
            state.expired = false;
        },
        handleLogout(state) {
            Object.assign(state, initialState);
            state.expired = true;
        },
        updateAccessToken(state, action) {
            state.accessToken = action.payload;
        },
        resetExpiry(state) {
            state.expired = null;
        },
    },
});

export const { handleLogin, handleLogout, updateAccessToken, resetExpiry } = authSlice.actions;
export default authSlice.reducer;