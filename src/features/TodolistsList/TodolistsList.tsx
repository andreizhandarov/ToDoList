import React, { useCallback, useEffect } from "react"
import {
  addTodolistTC,
  changeTodolistFilter,
  changeTodolistTitleTC,
  deleteTodolistTC,
  FilterValuesType,
  getTodolistsTC,
  TodolistDomainType,
} from "./model/todolistsSlice"
import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from "./model/tasksSlice"
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
    dispatch(getTodolistsTC())
  }, [])

  //Tasks
  const removeTask = useCallback((taskId: string, todolistId: string) => {
    dispatch(removeTaskTC(taskId, todolistId))
  }, [])

  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskTC(title, todolistId))
  }, [])

  const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
    dispatch(updateTaskTC(todolistId, taskId, { status }))
  }, [])

  const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
    dispatch(updateTaskTC(todolistId, taskId, { title }))
  }, [])

  //ToDoLista
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])

  const changeFilter = useCallback(
    (filter: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilter({todolistId, filter}))
    }, [])

  const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title))
  }, [])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(deleteTodolistTC(todolistId))
  }, [])

  if (!isLoggenIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolist} />
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
        })}
      </Grid>
    </>
  )
}
