import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  colorTheme: string;
  language: string;
}

const initialState: SettingsState = {
  colorTheme: "light",
  language: "ko",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeColorTheme: (state, action) => {
      state.colorTheme = action.payload;
    },
    changeLanguage: (state, action) => {
      if (state.language === action.payload) return;
      state.language = action.payload;
    },
  },
});

export default settingsSlice.reducer;
export const { changeColorTheme, changeLanguage } = settingsSlice.actions;
