import AppBar from '@mui/material/AppBar';
import './App.css';
import {useEffect, useState} from "react";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { MenuButton } from '../components/MenuButton/MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { CircularProgress, LinearProgress } from '@mui/material';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { useAppDispatch, useAppSelector } from './state/store';
import { RequestStatusType } from './app-reducer';
import { Navigate, Outlet } from 'react-router-dom';
import { logOutTC, meTC } from '../features/Login/auth-reducer';

type ThemeMode = 'dark' | 'light'

function AppWithRedux() {
	const dispatch = useAppDispatch()
	const status = useAppSelector<RequestStatusType>(state => state.app.status)
	const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
	const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

	const logOut = () => {
		dispatch(logOutTC())
	}

	useEffect(() => {
		dispatch(meTC())
	}, [])

	//UI
	const [themeMode, setThemeMode] = useState<ThemeMode>('light')
	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#ef6c00',
			},
		},
	})

	const onChangeHandler = () => {
		setThemeMode(themeMode == 'light' ? 'dark' : 'light')
	}

	if(!isInitialized){
		return (
			<div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
				<CircularProgress/>
			</div>
		)
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ErrorSnackbar />
			<AppBar position="static" sx={{mb: '15px'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<IconButton color="inherit">
						<MenuIcon />
					</IconButton>
					<div>
						{isLoggedIn && <MenuButton onClick={logOut}>Logout</MenuButton>}
						<MenuButton sx={{background: '#ab47bc'}}>FAQ</MenuButton>
						<Switch color={'default'} onChange={onChangeHandler}/>
					</div>
				</Toolbar>
				{ status === 'loading' && <LinearProgress /> }
			</AppBar>

			<Container fixed>
				<Outlet/>
			</Container>
		</ThemeProvider>
	);
}

export default AppWithRedux;
