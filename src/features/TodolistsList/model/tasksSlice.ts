import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/app-reducer"
import { taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from "api/todolist-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { AppRootStateType, AppThunk } from "app/state/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist, setTodolists } from "./todolistsSlice"
import { clearTasksAndTodolists } from "common/actions/common.actions"

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
    removeTask: (state, action: PayloadAction<{taskId: string, todolistId: string}>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if(index !== -1){
        tasks.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{task: TaskType}>) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    },
    updateTask: (state, action: PayloadAction<{taskId: string, model: UpdateDomainTaskType, todolistId: string}>) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTasks: (state, action: PayloadAction<{task: Array<TaskType>, todolistId: string}>) => {
      state[action.payload.todolistId] = action.payload.task;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
  }
})

export const tasksReducer = tasksSlice.reducer
export const {removeTask, addTask, updateTask, setTasks} = tasksSlice.actions

//ThunkCreate
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  taskAPI
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setTasks({task: res.data.items, todolistId}))
      dispatch(setAppStatus({ status: "succeeded" }))
    })
    .catch((error) => {
      setAppError({ error })
    })
}

export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  taskAPI
    .deleteTask(todolistId, taskId)
    .then((res) => {
      dispatch(removeTask({taskId, todolistId}))
      dispatch(setAppStatus({ status: "succeeded" }))
    })
    .catch((error) => {
      setAppError({ error })
    })
}

export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  taskAPI
    .createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTask({task: res.data.data.item}))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const task = state.tasks[todolistId].find((task) => task.id === taskId)

    if (task) {
      const apiModel: UpdateTaskType = {
        title: task.title,
        startDate: task.startDate,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        status: task.status,
        ...domainModel,
      }
      taskAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(updateTask({taskId, model: domainModel, todolistId}))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch)
        })
    }
  }
