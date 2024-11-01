import { createAction, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

export type ThemeModes = "dark" | "light";

const themeSlice = createSlice({
  name: 'theme',
  initialState: {mode: "light"},
  reducers: {
    setTheme: (state, action: PayloadAction<{mode: ThemeModes}>) => {
      state.mode = action.payload.mode
    }
  },
})

export const themeReducer = themeSlice.reducer
export const {setTheme} = themeSlice.actions

// thunks
export const themeMode = (theme: ThemeModes) => (dispatch: Dispatch) => {
    dispatch(setTheme({mode: theme}));
  };


