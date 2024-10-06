import AppBar from '@mui/material/AppBar';
import './App.css';
import {useState} from "react";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { MenuButton } from '../components/MenuButton/MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { TodolistsList } from '../features/TodolistsList/TodolistsList';
import { LinearProgress } from '@mui/material';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { AppRootStateType } from './state/store';
import { RequestStatusType } from './app-reducer';
import { useSelector } from 'react-redux';

type ThemeMode = 'dark' | 'light'

function AppWithRedux() {

	const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
	
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
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton sx={{background: '#ab47bc'}}>FAQ</MenuButton>
						<Switch color={'default'} onChange={onChangeHandler}/>
					</div>
				</Toolbar>
				{ status === 'loading' && <LinearProgress /> }
			</AppBar>

			<Container fixed>
				<TodolistsList />
			</Container>
		</ThemeProvider>
	);
}

export default AppWithRedux;
