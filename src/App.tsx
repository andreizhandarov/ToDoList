import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TasksStateType = {
	[todolistId: string]: TaskType[]
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
			{id: v1(), title: 'CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
		],
		[todolistId_2] : [
			{id: v1(), title: 'React', isDone: false},
			{id: v1(), title: 'TypeScript', isDone: true},
			{id: v1(), title: 'Reduce', isDone: false},
		]
	})

	const removeTask = (taskId: string, todolistId : string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
	}

	const addTask = (title: string, todolistId : string) => {
		const newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
	}

  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId : string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)})
	}

	const changeFilter = (filter: FilterValuesType, todolistId : string) => {
		setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter}: tl))
	}

	const removeTodolist = (todolistId: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todolistId))
		delete tasks[todolistId]
	}

	const todolistsComp: Array<JSX.Element> = todolists.map(tl => {
		let tasksForTodolist = tasks[tl.id]
		if (tl.filter === 'active') {
			tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
		}
	
		if (tl.filter === 'completed') {
			tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
		}

		return(
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
			/>
		)
	})

	return (
		<div className="App">
			{todolistsComp}
		</div>
	);
}

export default App;