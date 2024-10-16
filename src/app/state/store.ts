import { ThunkAction} from "redux-thunk"
import { Action } from "redux"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { tasksReducer } from "../../features/TodolistsList/model/tasksSlice"
import { todolistsReducer } from "../../features/TodolistsList/model/todolistsSlice"
import { appReducer } from "../app-reducer"
import { authReducer } from "../../features/Login/authSlice"
import { themeReducer } from "../themeSlice"
import { configureStore } from "@reduxjs/toolkit"

// непосредственно создаём store
export const store = configureStore({ 
  reducer: {
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
  theme: themeReducer,
  }
})
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunkDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
