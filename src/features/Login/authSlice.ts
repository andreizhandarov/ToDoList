import { LoginType } from "./Login"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/state/store"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { authAPI } from "api/todolist-api"
import { setAppStatus, setIsInitialized } from "app/app-reducer"
import { clearTasksAndTodolists } from "common/actions/common.actions"

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions

// thunks
export const loginTC = (data: LoginType): AppThunk => (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authAPI.login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: "succeeded" }))
      }else{
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
  }

export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authAPI.logOut()
  .then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(clearTasksAndTodolists())
    }else{
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch((error) => {
    handleServerNetworkError(error, dispatch);
  })
}

export const meTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authAPI.me()
  .then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setAppStatus({ status: "succeeded" }))
    }else{
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch((error) => {
    handleServerNetworkError(error, dispatch);
  })
  dispatch(setIsInitialized({ isInitialized: true }))
}
