import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./state/store";

export type ThemeModes = "dark" | "light";

const themeSlice = createSlice({
  name: 'theme',
  initialState: {mode: "light"},
  reducers: {
    setTheme: (state, action: PayloadAction<{mode: ThemeModes}>) => {
      state.mode = action.payload.mode
    }
  }
})

export const themeReducer = themeSlice.reducer
export const {setTheme} = themeSlice.actions

// thunks
export const setThemeTC = (theme: ThemeModes): AppThunk => (dispatch) => {
    dispatch(setTheme({mode: theme}));
  };
