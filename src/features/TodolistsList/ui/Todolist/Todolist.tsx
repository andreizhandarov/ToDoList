import React from "react"
import { AddItemForm } from "../../../../common/components/AddItemForm/AddItemForm"
import Box from "@mui/material/Box"
import { filterButtonsContainerSx } from "./Todolist.style"
import { TodolistDomainType } from "../../model/todolistsSlice"
import { TaskType } from "features/TodolistsList/api/taskApiTypes"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { addTask } from "features/TodolistsList/model/tasksSlice"
import { FilterTasksButton } from "./FilterTasksButton/FilterTasksButton"
import { TasksForTodolist } from "./TasksForTodolist/TasksForTodolist"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = ({todolist, tasks}: Props) => {

  const dispatch = useAppDispatch()

  const addTaskHandler = (taskTitle: string) => {
    return dispatch(addTask({ title: taskTitle, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"}/>
      <TasksForTodolist todolist={todolist} tasks={tasks}/>
      <Box sx={filterButtonsContainerSx}>
        <FilterTasksButton todolist={todolist}/>
      </Box>
    </div>
  )
}


