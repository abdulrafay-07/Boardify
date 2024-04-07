import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import themeSwitcher from "./themeSwitcher";

const store = configureStore({
    reducer: {
        auth: authSlice,
        theme: themeSwitcher
    }
});

export default store;