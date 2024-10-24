import AppBar from "@mui/material/AppBar"
import "./App.css"
import { useEffect } from "react"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import { MenuButton } from "../common/components/MenuButton/MenuButton"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Switch from "@mui/material/Switch"
import CssBaseline from "@mui/material/CssBaseline"
import { CircularProgress, LinearProgress } from "@mui/material"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar"
import { RequestStatusType } from "./appSlice"
import { Outlet } from "react-router-dom"
import { logOutTC, meTC } from "../features/Login/authSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { setThemeTC, ThemeModes } from "features/Theme/themeSlice"

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  const ThemeMode = useAppSelector<string>((state) => state.theme.mode)

  const logOut = () => {
    dispatch(logOutTC())
  }

  useEffect(() => {
    dispatch(meTC())
  }, [])

  //UI
  const onChangeHandler = () => {
    dispatch(setThemeTC(ThemeMode === "light" ? "dark" : "light"))
  }

  const theme = createTheme({
    palette: {
      mode: ThemeMode as ThemeModes,
      primary: {
        main: "#ef6c00",
      },
    },
  })

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorSnackbar />
      <AppBar position="static" sx={{ mb: "15px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            {isLoggedIn && <MenuButton onClick={logOut}>Logout</MenuButton>}
            <MenuButton sx={{ background: "#ab47bc" }}>FAQ</MenuButton>
            <Switch color={"default"} onChange={onChangeHandler} />
          </div>
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>

      <Container fixed>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
