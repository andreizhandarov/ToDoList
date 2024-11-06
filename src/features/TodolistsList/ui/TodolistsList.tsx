import React, { useEffect } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import Paper from "@mui/material/Paper"
import { Navigate } from "react-router-dom"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { Todolist } from "./Todolist/Todolist"
import { addTodolist, fetchTodolists, TodolistDomainType } from "../model/todolistsSlice"
import { TasksStateType } from "../model/tasksSlice"

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

  const addTodolistHandler = (title: string) => {
    dispatch(addTodolist(title))
  }

  if (!isLoggenIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolistHandler} />
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
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
