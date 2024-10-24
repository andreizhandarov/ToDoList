import React, { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import { Delete } from "@mui/icons-material"
import { getListItemSx } from "../Todolist.style"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { TaskType } from "./task.api"
import { TaskStatuses } from "common/enums/enums"

type TaskPropsType = {
  task: TaskType
  todolistId: string
  removeTask: (taskId: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
  const { task, todolistId, removeTask, changeTaskStatus, changeTaskTitle } = props

  const removeTaskHandler = () => {
    removeTask(task.id, todolistId)
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    changeTaskStatus(task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
  }

  const changeTaskTitleCallback = (newTitle: string) => {
    changeTaskTitle(task.id, newTitle, todolistId)
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatuses.Completed)}>
      <div>
        <Checkbox
          color={"secondary"}
          checked={task.status === TaskStatuses.Completed}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitleCallback} />
      </div>

      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </ListItem>
  )
})
