import { createTheme } from "@mui/material/styles"
import { useAppSelector } from "common/hooks/useAppSelector"
import { ThemeModes } from "features/Theme/model/themeSlice"
import React from "react"

export const useCreateTheme = () => {
  const ThemeMode = useAppSelector<string>((state) => state.theme.mode)

  const theme = createTheme({
    palette: {
      mode: ThemeMode as ThemeModes,
      primary: {
        main: "#ef6c00",
      },
    },
  })

  return { ThemeMode, theme }
}
