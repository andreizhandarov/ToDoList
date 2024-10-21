import React, { useCallback, useEffect } from "react"
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  deleteTodolist,
  fetchTodolists,
  FilterValuesType,
  TodolistDomainType,
} from "./model/todolistsSlice"
import { addTask, removeTask, TasksStateType, updateTask } from "./model/tasksSlice"
import Grid from "@mui/material/Unstable_Grid2"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "app/state/store"
import { TaskStatuses } from "api/todolist-api"
import { AddItemForm } from "components/AddItemForm/AddItemForm"

export const TodolistsList: React.FC = () => {
  const todolists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists)
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks)
  const isLoggenIn = useAppSelector((state) => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggenIn) {
      return
    }
    dispatch(fetchTodolists())
  }, [])

  //Tasks
  const removeTaskCallback = useCallback((taskId: string, todolistId: string) => {
    dispatch(removeTask({taskId, todolistId}))
  }, [])

  const addTaskCallback = useCallback((title: string, todolistId: string) => {
    dispatch(addTask({title, todolistId}))
  }, [])

  const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
    dispatch(updateTask({todolistId, taskId, domainModel:{ status }}))
  }, [])

  const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
    dispatch(updateTask({todolistId, taskId, domainModel:{ title }}))
  }, [])

  //ToDoLista
  const addTodolistCallback = useCallback((title: string) => {
    dispatch(addTodolist(title))
  }, [])

  const changeFilter = useCallback(
    (filter: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilter({todolistId, filter}))
    }, [])

  const changeTodolistTitleCallback = useCallback((title: string, todolistId: string) => {
    dispatch(changeTodolistTitle({todolistId, title}))
  }, [])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(deleteTodolist(todolistId))
  }, [])

  if (!isLoggenIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>

      <Grid container spacing={4}>
        {todolists.map((tl) => {
          let tasksForTodolist = tasks[tl.id]

          return (
            <Grid key={tl.id}>
              <Paper sx={{ p: "15px" }} elevation={8}>
                <Todolist
                  todolist={tl}
                  tasks={tasksForTodolist}
                  removeTask={removeTaskCallback}
                  changeFilter={changeFilter}
                  addTask={addTaskCallback}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitleCallback}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
