import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { useCallback } from "react";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../model/tasks-reducer";
import { v1 } from "uuid";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "../../model/todolists-reducer";

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

export const useAppWithRedux = () => {
        console.log('AppWithRedux is called')

        const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
        const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
        const dispatch = useDispatch();

	//Tasks
	const removeTask = useCallback((taskId: string, todolistId : string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
	},[dispatch])

	const addTask = useCallback((title: string, todolistId : string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
	},[dispatch])

	const changeTaskStatus = useCallback((taskId: string, taskStatus: boolean, todolistId : string) => {
        const action = changeTaskStatusAC(taskId, taskStatus, todolistId)
        dispatch(action)
	},[dispatch])

	const changeTaskTitle = useCallback((taskId: string, title: string, todolistId : string) => {
		const action = changeTaskTitleAC(taskId, title, todolistId)
        dispatch(action)
	},[dispatch])

	//ToDoLista
	const addTodolist = useCallback((title: string) => {
		const todolistId = v1();
        const action = addTodolistAC(todolistId, title)
        dispatch(action)
	}, [dispatch])

	const changeFilter = useCallback((filter: FilterValuesType, todolistId : string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
	},[dispatch])

	const changeTodolistTitle = useCallback((title: string, todolistId : string) => {
        const action = changeTodolistTitleAC(todolistId, title)
        dispatch(action)
	},[dispatch])

	const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
	},[dispatch])

        return {todolists, tasks, removeTask, addTask, changeTaskStatus, changeTaskTitle, addTodolist, changeFilter, changeTodolistTitle, removeTodolist}
}