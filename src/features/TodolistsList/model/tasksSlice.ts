import { handleServerAppError, handleServerNetworkError } from "common/utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolist, deleteTodolist, fetchTodolists } from "./todolistsSlice"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums/enums"
import { AddTaskArgs, RemoveTaskArg, taskAPI, TaskType, UpdateTaskArg, UpdateTaskType } from "../Todolist/Task/task.api"
import { setAppStatus } from "app/appSlice"

export type TasksStateType = {
  [todolistId: string]: TaskType[]
}

export type UpdateDomainTaskType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.task
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
  },
})

export const tasksReducer = tasksSlice.reducer

//ThunkCreate
export const fetchTasks = createAppAsyncThunk<{ task: TaskType[]; todolistId: string }, string>(
  `${tasksSlice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await taskAPI.getTasks(todolistId)
      const task = res.data.items
      dispatch(setAppStatus({ status: "succeeded" }))
      return { task, todolistId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const removeTask = createAppAsyncThunk<RemoveTaskArg, RemoveTaskArg>(
  `${tasksSlice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await taskAPI.deleteTask(arg.todolistId, arg.taskId)
      dispatch(setAppStatus({ status: "succeeded" }))
      return arg
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(
  `${tasksSlice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await taskAPI.createTask(arg)
      const task = res.data.data.item
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { task }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(
  `${tasksSlice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      const state = getState()
      const task = state.tasks[arg.todolistId].find((task) => task.id === arg.taskId)

      if (task) {
        const apiModel: UpdateTaskType = {
          title: task.title,
          startDate: task.startDate,
          description: task.description,
          deadline: task.deadline,
          priority: task.priority,
          status: task.status,
          ...arg.domainModel,
        }
        const res = await taskAPI.updateTask(arg.todolistId, arg.taskId, apiModel)
        if (res.data.resultCode === ResultCode.success) {
          return arg
        } else {
          handleServerAppError(res.data, dispatch)
          return rejectWithValue(null)
        }
      }
      return rejectWithValue(null)
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)
