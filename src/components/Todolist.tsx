import React, { ChangeEvent} from "react";
import { Button } from "./Button";
import { FilterValuesType, TaskType } from "../App";
import { Input } from "./Input";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

type PropsType = {
	title: string,
	tasks: TaskType[],
	todolistId: string,
	filter: FilterValuesType,
	removeTask: (taskId: string, todolistId : string) => void,
	addTask: (title: string, todolistId : string) => void,
	changeTaskStatus: (todolistId : string, taskId: string, taskStatus: boolean) => void,
	changeFilter: (todolistId : string, filter: FilterValuesType) => void,	
	removeTodolist: (todolistId: string) => void,
	changeTaskTitle: (todolistId : string, taskId: string, title: string) => void,
	changeTodolistTitle: (todolistId : string, title: string) => void
}

export const Todolist = (props: PropsType) => {
	const {title, tasks, filter,todolistId, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist, changeTaskTitle, changeTodolistTitle} = props

	const addTaskCallBack = (taskTitle: string) => {
		addTask(todolistId, taskTitle)
	
}

const changeFilterTasksHandler = (filter: FilterValuesType) => {
	changeFilter(todolistId, filter)
}

const changeTodolistTitleCallBack =(newTitle: string) => {
	changeTodolistTitle(todolistId, newTitle)
}

	return (
		<div>
			<h3>
				<EditableSpan title={title} changeTitle={changeTodolistTitleCallBack}/>  
				<Button title={'X'} onClick={()=> removeTodolist(todolistId)}/>
			</h3>
			<AddItemForm addItem={addTaskCallBack} />
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(todolistId, task.id, newStatusValue)
							}

							const changeTaskTitleCallback = (newTitle: string) => {
								changeTaskTitle(todolistId, task.id, newTitle)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<Input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan title={task.title} changeTitle={changeTaskTitleCallback}/>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
