import { fetchTasks } from "./tasksSlice"
import { RequestStatusType, setAppStatus } from "app/app-reducer"
import { todolistAPI, TodolistType } from "api/todolist-api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/state/store"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { handleServerNetworkError } from "utils/error-utils"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{todolistId: string}>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolist: (state, action: PayloadAction<{todolist: TodolistType}>) => {
      state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
    },
    changeTodolistTitle: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId)
      if(index !== -1){
        state[index].title = action.payload.title
      } 
    },
    changeTodolistFilter: (state, action: PayloadAction<{todolistId: string, filter: FilterValuesType}>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId)
      if(index !== -1){
        state[index].filter = action.payload.filter
      } 
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{todolistId: string, status: RequestStatusType}>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId)
      if(index !== -1){
        state[index].entityStatus = action.payload.status
      } 
    },
    setTodolists: (state, action: PayloadAction<{todolists: Array<TodolistType>}>) => {
      action.payload.todolists.forEach((todo) => {state.push({...todo, filter: "all", entityStatus: "idle"})})
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearTasksAndTodolists, () => {
      return [];
    });
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {removeTodolist, addTodolist, changeTodolistTitle, changeTodolistFilter, changeTodolistEntityStatus,
  setTodolists} = todolistsSlice.actions

//Thunk
export const getTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists({todolists: res.data}))
      dispatch(setAppStatus({ status: "succeeded" }))
      return res.data
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasks(tl.id))
      })
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
}

export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({todolistId, status: "loading"}))
  todolistAPI
    .deleteTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodolist({todolistId}))
        dispatch(setAppStatus({ status: "succeeded" }))
    })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistAPI
    .createTodolist(title)
      .then((res) => {
        dispatch(addTodolist({todolist: res.data.data.item}))
        dispatch(setAppStatus({ status: "succeeded" }))
    })
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
  todolistAPI
    .updateTodolist(todolistId, title)
      .then((res) => {
      dispatch(changeTodolistTitle({todolistId, title}))
    })
}
