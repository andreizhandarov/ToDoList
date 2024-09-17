import React, { ChangeEvent, useCallback } from 'react';
import { TaskType } from './AppWithReducers';
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "./EditableSpan";
import { getListItemSx } from './Todolist.style';

export type TaskPropsType = {
	removeTask: (taskId: string, todolistId : string) => void,
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId : string) => void,
	changeTaskTitle: (taskId: string, title: string, todolistId : string) => void,
	task: TaskType,
	todolistId: string
}

export const TaskComponent = React.memo((props: TaskPropsType) => {
	const{removeTask, changeTaskStatus, changeTaskTitle, task, todolistId} = props

	const removeTaskHandler = useCallback(() => {
		removeTask(task.id, todolistId)
	},[removeTask, task.id, todolistId])

	const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const newStatusValue = e.currentTarget.checked
		changeTaskStatus(task.id, newStatusValue, todolistId)
	}, [changeTaskStatus, task.id, todolistId])

	const changeTaskTitleCallback = useCallback((newTitle: string) => {
		changeTaskTitle(task.id, newTitle, todolistId)
	},[changeTaskTitle, task.id, todolistId])

	return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
		<div>
			<Checkbox color={'secondary'} checked={task.isDone} onChange={changeTaskStatusHandler}/>
			<EditableSpan title={task.title} changeTitle={changeTaskTitleCallback}/>
		</div>
		
		<IconButton  onClick={removeTaskHandler}>
			<Delete />
		</IconButton>
	</ListItem>
})

