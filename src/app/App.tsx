import { useEffect } from "react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CircularProgress } from "@mui/material"
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar"
import { me } from "../features/Login/model/authSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useCreateTheme } from "features/Theme/lib/hooks/useCreateTheme"
import { Header } from "common/components/Header/Header"
import { Providers } from "common/components/Providers/Providers"

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const { theme } = useCreateTheme()

  useEffect(() => {
    dispatch(me())
  }, [])

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
      <CssBaseline/>
      <ErrorSnackbar/>
      <Header/>
      <Providers/>
    </ThemeProvider>
  )
}

export default App
