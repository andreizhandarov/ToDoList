import AppBar from '@mui/material/AppBar';
import { AddItemForm } from './AddItemForm';
import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
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

function App() {

	const todolistId_1 = v1();
	const todolistId_2 = v1();

	const[todolists, setTodolists] = useState<Array<TodolistType>>([
		{id: todolistId_1, title: "What to learn", filter: 'all'},
		{id: todolistId_2, title: "What to bye", filter: 'all'}
	])

	const [tasks, setTasks] = useState<TasksStateType>({
		[todolistId_1] : [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistId_2] : [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		]
	})

	//Tasks
	const removeTask = (taskId: string, todolistId : string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
	}

	const addTask = (title: string, todolistId : string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId : string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)})
	}

	const changeTaskTitle = (taskId: string, title: string, todolistId : string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, title: title} : t)})
	}

	//ToDoLista
	const addTodolist = (title: string) => {
		const todolistId = v1();
		const newTodo: TodolistType ={
			id: todolistId,
			title: title,
			filter: 'all'
		}
		const nexState: Array<TodolistType> = [...todolists, newTodo]
		setTodolists(nexState)
		setTasks({...tasks, [todolistId]: []})
	}

	const changeFilter = (filter: FilterValuesType, todolistId : string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter}: tl))
	}

	const changeTodolistTitle = (title: string, todolistId : string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title}: tl))
	}

	const removeTodolist = (todolistId: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todolistId))
		delete tasks[todolistId]
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

export default App;
