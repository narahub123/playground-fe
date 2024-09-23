import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  colorTheme: string;
}

const initialState: SettingsState = {
  colorTheme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeColorTheme: (state, action) => {
      state.colorTheme = action.payload;
    },
  },
});

export default settingsSlice.reducer;
export const { changeColorTheme } = settingsSlice.actions;
