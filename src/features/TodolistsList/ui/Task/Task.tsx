import React, { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { TaskStatuses } from "common/enums/enums"
import { getListItemSx } from "../Todolist/Todolist.style"
import { TaskType } from "features/TodolistsList/api/taskApiTypes"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { removeTask, updateTask } from "features/TodolistsList/model/tasksSlice"

type Props = {
  task: TaskType
  todolistId: string
}

export const Task = React.memo(({task, todolistId}: Props) => {

  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTask({ taskId: task.id, todolistId }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTask({ todolistId, taskId: task.id, domainModel: { status } }))
  }

  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(updateTask({ todolistId, taskId: task.id, domainModel: { title: newTitle }}))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatuses.Completed)}>
      <div>
        <Checkbox
          color={"secondary"}
          checked={task.status === TaskStatuses.Completed}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} />
      </div>

      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </ListItem>
  )
})
