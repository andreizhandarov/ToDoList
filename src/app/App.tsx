import AppBar from "@mui/material/AppBar"
import { useEffect } from "react"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import { MenuButton } from "../common/components/MenuButton/MenuButton"
import { ThemeProvider } from "@mui/material/styles"
import Switch from "@mui/material/Switch"
import CssBaseline from "@mui/material/CssBaseline"
import { CircularProgress, LinearProgress } from "@mui/material"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar"
import { RequestStatusType } from "./appSlice"
import { Outlet } from "react-router-dom"
import { logout, me } from "../features/Login/model/authSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { themeMode } from "features/Theme/model/themeSlice"
import { useCreateTheme } from "features/Theme/lib/hooks/useCreateTheme"

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

  const { ThemeMode, theme } = useCreateTheme()

  useEffect(() => {
    dispatch(me())
  }, [])

  const logOut = () => {
    dispatch(logout())
  }

  const changeThemeHandler = () => {
    dispatch(themeMode(ThemeMode === "light" ? "dark" : "light"))
  }

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
            {!isLoggedIn && <MenuButton sx={{ background: "#ab47bc" }}>FAQ</MenuButton>}
            <Switch color={"default"} onChange={changeThemeHandler} />
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
