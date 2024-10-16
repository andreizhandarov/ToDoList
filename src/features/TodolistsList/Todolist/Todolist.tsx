import { useCallback, useMemo } from "react"
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm"
import { EditableSpan } from "../../../components/EditableSpan/EditableSpan"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import { Delete } from "@mui/icons-material"
import List from "@mui/material/List"
import Box from "@mui/material/Box"
import { filterButtonsContainerSx } from "./Todolist.style"
import React from "react"
import { TaskWithRedux } from "./Task/TaskWithRedux"
import { FilterValuesType, TodolistDomainType } from "../model/todolistsSlice"
import { TaskStatuses, TaskType } from "../../../api/todolist-api"

type PropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
  changeFilter: (filter: FilterValuesType, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
  const {
    todolist,
    tasks,
    changeFilter,
    addTask,
    removeTodolist,
    changeTodolistTitle,
    removeTask,
    changeTaskStatus,
    changeTaskTitle,
  } = props

  const addTaskCallBack = useCallback(
    (taskTitle: string) => {
      addTask(taskTitle, todolist.id)
    },
    [addTask, todolist.id],
  )

  const removeTodolistCallBack = useCallback(() => {
    removeTodolist(todolist.id)
  }, [removeTodolist, todolist.id])

  const changeFilterTasksHandler = useCallback(
    (filter: FilterValuesType) => {
      changeFilter(filter, todolist.id)
    },
    [changeFilter, todolist.id],
  )

  const changeTodolistTitleCallBack = useCallback(
    (newTitle: string) => {
      changeTodolistTitle(newTitle, todolist.id)
    },
    [changeTodolistTitle, todolist.id],
  )

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

  console.log(tasks, "tasks")
  return (
    <div>
      <h3>
        <EditableSpan title={todolist.title} changeTitle={changeTodolistTitleCallBack} />
        <IconButton onClick={removeTodolistCallBack} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === "loading"} />
      {tasks?.length === 0 ? (
        <p>There are no tasks</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => (
            <TaskWithRedux
              key={task.id}
              task={task}
              todolistId={todolist.id}
              removeTask={removeTask}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
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

//Мемоизация компоненты Button из Material UI c расширением для типизации
// type ButtonMemoPropsType = ButtonProps & {}
// const ButtonMemo = React.memo(({variant, onClick, color, children, ...rest}: ButtonMemoPropsType) => {
// 	return <Button variant={variant} onClick={onClick} color={color} {...rest}>{children}</Button>
// })

//или еще вариатн
const ButtonMemo = React.memo(Button)
