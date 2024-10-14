import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { Action, combineReducers } from "redux"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { tasksReducer } from "../../features/TodolistsList/model/tasks-reducer"
import { todolistsReducer } from "../../features/TodolistsList/model/todolists-reducer"
import { appReducer } from "../app-reducer"
import { authReducer } from "../../features/Login/authSlice"
import { themeReducer } from "../themeSlice"
import { configureStore } from "@reduxjs/toolkit"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
  theme: themeReducer,
})
// непосредственно создаём store
export const store = configureStore({ reducer: rootReducer })
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, Action>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, Action>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
