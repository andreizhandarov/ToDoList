import AppBar from '@mui/material/AppBar';
import { AddItemForm } from '../AddItemForm';
import {Todolist} from "../Todolist";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { MenuButton } from '../MenuButton';
import { ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { useAppWithRedux } from './hooks/useAppWithRedux';
import { useThemes } from './hooks/useThemes';

function AppWithRedux() {

	//CustomHooks - useAppWithRedux() and useThemes()
	const {	todolists, 
			tasks, 
			removeTask, 
			addTask, 
			changeTaskStatus, 
			changeTaskTitle, 
			addTodolist, 
			changeFilter, 
			changeTodolistTitle, 
			removeTodolist } = useAppWithRedux()

	const {theme, onChangeHandler} = useThemes()

	//UI
	const todolistsComp: Array<JSX.Element> = todolists.map(tl => {
		
		let tasksForTodolist = tasks[tl.id]

		return(
			<Grid key={tl.id}>
				<Paper sx={{p: '15px'}} elevation={8}>
					<Todolist
						title={tl.title}
						tasks={tasksForTodolist}
						todolistId={tl.id}
						filter={tl.filter}

						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						removeTodolist={removeTodolist}
						changeTaskTitle={changeTaskTitle}
						changeTodolistTitle={changeTodolistTitle}
					/>
				</Paper>
			</Grid>
		)
	})

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
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
			</AppBar>

			<Container fixed>
				<Grid container sx={{p: '15px 0'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>

				<Grid container spacing={4}>
					{todolistsComp}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default AppWithRedux;
