import AppBar from '@mui/material/AppBar';
import { AddItemForm } from './AddItemForm';
import './App.css';
import {Todolist} from "./Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { MenuButton } from './MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './model/tasks-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useDispatch } from 'react-redux';

type ThemeMode = 'dark' | 'light'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TasksStateType = {
	[todolistId: string]: TaskType[]
}

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

	//Tasks
	const removeTask = (taskId: string, todolistId : string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
	}

	const addTask = (title: string, todolistId : string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId : string) => {
        const action = changeTaskStatusAC(taskId, taskStatus, todolistId)
        dispatch(action)
	}

	const changeTaskTitle = (taskId: string, title: string, todolistId : string) => {
		const action = changeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
	}

	//ToDoLista
	const addTodolist = (title: string) => {
		const todolistId = v1();
        const action = addTodolistAC(todolistId, title)
        dispatch(action)
	}

	const changeFilter = (filter: FilterValuesType, todolistId : string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
	}

	const changeTodolistTitle = (title: string, todolistId : string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
	}

	const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
	}

	
	//UI
	const todolistsComp: Array<JSX.Element> = todolists.map(tl => {

		let tasksForTodolist = tasks[tl.id]
		if (tl.filter === 'active') {
			tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
		}
	
		if (tl.filter === 'completed') {
			tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
		}

		return(
			<Grid>
				<Paper sx={{p: '15px'}} elevation={8}>
					<Todolist
						key={tl.id}
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
