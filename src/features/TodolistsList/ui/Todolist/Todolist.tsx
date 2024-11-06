import { useMemo } from "react"
import { AddItemForm } from "../../../../common/components/AddItemForm/AddItemForm"
import { EditableSpan } from "../../../../common/components/EditableSpan/EditableSpan"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import { Delete } from "@mui/icons-material"
import List from "@mui/material/List"
import Box from "@mui/material/Box"
import { filterButtonsContainerSx } from "./Todolist.style"
import React from "react"
import { changeTodolistFilter, changeTodolistTitle, deleteTodolist, FilterValuesType, TodolistDomainType } from "../../model/todolistsSlice"
import { TaskStatuses } from "common/enums/enums"
import { Task } from "../Task/Task"
import { TaskType } from "features/TodolistsList/api/taskApiTypes"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { addTask } from "features/TodolistsList/model/tasksSlice"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = React.memo(({todolist, tasks}: Props) => {

  const dispatch = useAppDispatch()

  const addTaskHandler = (taskTitle: string) => {
    dispatch(addTask({ title: taskTitle, todolistId: todolist.id }))
  }

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ todolistId: todolist.id, filter }))
}

  const removeTodolistHandler = () => {
    dispatch(deleteTodolist(todolist.id))
  }

  const changeTodolistTitleHandler = (newTitle: string) => {
      dispatch(changeTodolistTitle({ todolistId: todolist.id, title: newTitle }))
  }

  let tasksForTodolist = tasks

  tasksForTodolist = useMemo(() => {
    if (todolist.filter === "active") {
      tasksForTodolist = tasks.filter((task) => task.status === TaskStatuses.New)
    }

    if (todolist.filter === "completed") {
      tasksForTodolist = tasks.filter((task) => task.status === TaskStatuses.Completed)
    }
    return tasksForTodolist
  }, [tasksForTodolist, todolist.filter])

  return (
    <div>
      <h3>
        <EditableSpan title={todolist.title} changeTitle={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />

      {tasks?.length === 0 ? (
        <p>There are no tasks</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => (
            <Task
              key={task.id}
              task={task}
              todolistId={todolist.id}
            />
          ))}
        </List>
      )}

      <Box sx={filterButtonsContainerSx}>
        <ButtonMemo
          variant={todolist.filter === "all" ? "contained" : "text"}
          color={"inherit"}
          onClick={() => changeFilterTasksHandler("all")}
        >
          All
        </ButtonMemo>
        <ButtonMemo
          variant={todolist.filter === "active" ? "contained" : "text"}
          color={"primary"}
          sx={{ m: "0 5px" }}
          onClick={() => changeFilterTasksHandler("active")}
        >
          Active
        </ButtonMemo>
        <ButtonMemo
          variant={todolist.filter === "completed" ? "contained" : "text"}
          color={"secondary"}
          onClick={() => changeFilterTasksHandler("completed")}
        >
          Completed
        </ButtonMemo>
      </Box>
    </div>
  )
})

const ButtonMemo = React.memo(Button)
