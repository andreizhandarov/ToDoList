import { fetchTasks } from "./tasksSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { ChangeTodolistTitleArg, todolistAPI, TodolistType } from "../Todolist/todolist.api"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((todo) => {
          state.push({ ...todo, filter: "all", entityStatus: "idle" })
        })
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistFilter, changeTodolistEntityStatus } = todolistsSlice.actions

//Thunk
export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>(
  `${todolistsSlice.name}/fetchTodolists`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistAPI.getTodolists()
      const todolists = res.data
      dispatch(setAppStatus({ status: "succeeded" }))
      for (const tl of todolists) {
        dispatch(fetchTasks(tl.id))
      }
      return { todolists }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  `${todolistsSlice.name}/deleteTodolist`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistAPI.deleteTodolist(todolistId)
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolistId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${todolistsSlice.name}/addTodolist`,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistAPI.createTodolist(title)
      const todolist = res.data.data.item
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolist }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const changeTodolistTitle = createAppAsyncThunk<ChangeTodolistTitleArg, ChangeTodolistTitleArg>(
  `${todolistsSlice.name}/changeTodolistTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await todolistAPI.updateTodolist(arg.todolistId, arg.title)
      return arg
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)
