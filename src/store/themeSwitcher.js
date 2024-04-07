import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "dark"
}

const themeSwitcher = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "dark" ? "light" : "dark";
        }
    }
})

export const { toggleTheme } = themeSwitcher.actions;

export default themeSwitcher.reducer;