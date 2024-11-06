import { taskAPI } from "features/TodolistsList/api/task.api"
import { useEffect, useState } from "react"

export default {
  title: "API/TASKS",
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "eb48a1fa-f2dc-4e35-8718-9971b048927e"
    taskAPI.getTasks(todolistId).then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "eb48a1fa-f2dc-4e35-8718-9971b048927e"
    taskAPI.createTask({ todolistId, title: "NewTask2" }).then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = ""
    const taskId = ""
    taskAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = ''
//         const taskId = ''
//         taskAPI.updateTask(todolistId, taskId, 'SOME NEW TITLE FROM TASK1').then(res => {setState(res.data)})
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }
