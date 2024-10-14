
import { LoginType } from "./Login"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/state/store"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { clearTodosDataAC } from "features/TodolistsList/model/todolists-reducer"
import { authAPI } from "api/todolist-api"
import { setAppStatus, setIsInitialized } from "app/app-reducer"

const authSlice = createSlice({
  name: 'auth',
  initialState: {isLoggedIn: false},
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
      state.isLoggedIn = action.payload.isLoggedIn 
    }
  }
})

export const authReducer = authSlice.reducer
export const {setIsLoggedIn} = authSlice.actions

// thunks
export const loginTC = (data: LoginType): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({status: "loading"}))
  try {
    const result = await authAPI.login(data)
    if (result.data.resultCode === 0) {
      dispatch(setIsLoggedIn({isLoggedIn: true}))
      dispatch(setAppStatus({status: "succeeded"}))
    } else {
      handleServerAppError(result.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as any, dispatch)
  }
}

export const logOutTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({status: "loading"}))
  try {
    const result = await authAPI.logOut()
    if (result.data.resultCode === 0) {
      dispatch(setIsLoggedIn({isLoggedIn: false}))
      dispatch(setAppStatus({status: "succeeded"}))
      dispatch(clearTodosDataAC())
    } else {
      handleServerAppError(result.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as any, dispatch)
  }
}

export const meTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({status: "loading"}))
  try {
    const result = await authAPI.me()
    if (result.data.resultCode === 0) {
      dispatch(setIsLoggedIn({isLoggedIn: true}))
      dispatch(setAppStatus({status: "succeeded"}))
    } else {
      handleServerAppError(result.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as any, dispatch)
  }
  dispatch(setIsInitialized({isInitialized: true}))
}
