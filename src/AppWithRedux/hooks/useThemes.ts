import { createTheme } from "@mui/material/styles"
import { useState } from "react"

type ThemeMode = 'dark' | 'light'

export const useThemes = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#ef6c00',
			},
		},
	})

	const onChangeHandler =() => {
		setThemeMode(themeMode == 'light' ? 'dark' : 'light')
	}

    return {theme, onChangeHandler}
}