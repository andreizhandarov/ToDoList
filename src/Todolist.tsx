import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
//import {Button} from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.style";

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

export const Todolist = (props: PropsType) => {
	const {title, tasks, filter,todolistId, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist, changeTaskTitle, changeTodolistTitle} = props

	const addTaskCallBack = (taskTitle: string) => {
			addTask(taskTitle, todolistId)
		
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, todolistId)
	}

	const changeTodolistTitleCallBack =(newTitle: string) => {
		changeTodolistTitle(newTitle, todolistId)
	}

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
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							const changeTaskTitleCallback = (newTitle: string) => {
								changeTaskTitle(task.id, newTitle, todolistId)
							}

							return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
								<Checkbox color={'secondary'} checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan title={task.title} changeTitle={changeTaskTitleCallback}/>
								</div>
								
								<IconButton  onClick={removeTaskHandler}>
									<Delete />
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button variant={filter === 'all' ? 'contained' : 'text'} color={'inherit'} onClick={()=> changeFilterTasksHandler('all')}>All</Button>
				<Button variant={filter === 'active' ? 'contained' : 'text' } color={'primary'} sx={{m: '0 5px'}} onClick={()=> changeFilterTasksHandler('active')} >Active</Button>
				<Button variant={filter === 'completed' ? 'contained' : 'text' } color={'secondary'} onClick={()=> changeFilterTasksHandler('completed')}>Completed</Button>
			</Box>
		</div>
	)
}
