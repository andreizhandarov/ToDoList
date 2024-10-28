import { LoginType } from "./Login"
import { createSlice} from "@reduxjs/toolkit"
import { handleServerAppError} from "common/utils/handle-server-app-error"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { ResultCode } from "common/enums/enums"
import { authAPI } from "./auth.api"
import { setAppStatus, setIsInitialized } from "app/appSlice"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { handleServerNetworkError } from "common/utils/handle-server-network-error"

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

export const authReducer = authSlice.reducer

// thunks
export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(
  `${authSlice.name}/login`,
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await authAPI.login(data)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { isLoggedIn: true }
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

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${authSlice.name}/logOut`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await authAPI.logOut()
      if (res.data.resultCode === ResultCode.success) {
        dispatch(clearTasksAndTodolists())
        dispatch(setAppStatus({ status: "succeeded" }))
        return { isLoggedIn: false }
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

export const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${authSlice.name}/me`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await authAPI.me()
      if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true }
      } else {
        // handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setIsInitialized({ isInitialized: true }))
    }
  },
)
