import { tasksReducer } from "../../features/TodolistsList/model/tasksSlice"
import { todolistsReducer } from "../../features/TodolistsList/model/todolistsSlice"
import { appReducer } from "../appSlice"
import { authReducer } from "../../features/Login/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"
import { themeReducer } from "features/Theme/model/themeSlice"

// непосредственно создаём store
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
    theme: themeReducer,
  },
})
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
