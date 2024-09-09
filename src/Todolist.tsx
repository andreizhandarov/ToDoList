import {FilterValuesType, TaskType} from "./AppWithRedux/hooks/useAppWithRedux";
import {useCallback, useMemo} from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button, { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx} from "./Todolist.style";
import React from "react";
import { TaskComponent } from "./TaskComponent";
import { TaskWithRedux } from "./TaskWithRedux";

type PropsType = {
	title: string,
	tasks: TaskType[],
	todolistId: string,
	filter: FilterValuesType,
	removeTask: (taskId: string, todolistId : string) => void,
	addTask: (title: string, todolistId : string) => void,
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId : string) => void,
	changeFilter: (filter: FilterValuesType, todolistId : string) => void,	
	removeTodolist: (todolistId: string) => void,
	changeTaskTitle: (taskId: string, title: string, todolistId : string) => void,
	changeTodolistTitle: (title: string, todolistId : string) => void
}

export const Todolist = React.memo((props: PropsType) => {
	const {title, tasks, filter,todolistId, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist, changeTaskTitle, changeTodolistTitle} = props

	console.log('Todolist is called')

	const addTaskCallBack = useCallback((taskTitle: string) => {
			addTask(taskTitle, todolistId)
	}, [addTask, todolistId])

	const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
		changeFilter(filter, todolistId)
	},[changeFilter, todolistId])

	const changeTodolistTitleCallBack = useCallback((newTitle: string) => {
		changeTodolistTitle(newTitle, todolistId)
	},[changeTodolistTitle, todolistId])

	let tasksForTodolist = tasks;

	tasksForTodolist = useMemo(() => {
		if (filter === 'active') {
			tasksForTodolist = tasks.filter(task => !task.isDone)
		}
	
		if (filter === 'completed') {
			tasksForTodolist = tasks.filter(task => task.isDone)
		}
		return tasksForTodolist
	},[tasksForTodolist, filter])


	return (
		<div>
			<h3>
				<EditableSpan title={title} changeTitle={changeTodolistTitleCallBack}/>
				<IconButton  onClick={()=> removeTodolist(todolistId)}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTaskCallBack}/>
			{
				tasks.length === 0
					? <p>There are no tasks</p>
					: <List >
						{tasksForTodolist.map((task) => <TaskWithRedux 
							key = {task.id}
							task = {task}
							todolistId = {todolistId}
							// removeTask = {removeTask}
							// changeTaskStatus = {changeTaskStatus}
							// changeTaskTitle = {changeTaskTitle}
						/>)}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<ButtonMemo variant={filter === 'all' ? 'contained' : 'text'} color={'inherit'} onClick={()=> changeFilterTasksHandler('all')}>All</ButtonMemo>
				<ButtonMemo variant={filter === 'active' ? 'contained' : 'text' } color={'primary'} sx={{m: '0 5px'}} onClick={()=> changeFilterTasksHandler('active')} >Active</ButtonMemo>
				<ButtonMemo variant={filter === 'completed' ? 'contained' : 'text' } color={'secondary'} onClick={()=> changeFilterTasksHandler('completed')}>Completed</ButtonMemo>
			</Box>
		</div>
	)
})

//Мемоизация компоненты Button из Material UI c расширением для типизации
// type ButtonMemoPropsType = ButtonProps & {}
// const ButtonMemo = React.memo(({variant, onClick, color, children, ...rest}: ButtonMemoPropsType) => {
// 	return <Button variant={variant} onClick={onClick} color={color} {...rest}>{children}</Button>  
// })

//или еще вариатн
const ButtonMemo = React.memo(Button)