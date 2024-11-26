import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { handleServerAppError } from "common/utils/handle-server-app-error"
import { clearTasksAndTodolists } from "common/actions/common.actions"
import { ResultCode } from "common/enums/enums"
import { setIsInitialized } from "app/appSlice"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { thunkTryCatch } from "common/utils/thunkTryCatch"
import { authAPI } from "../api/auth.api"
import { LoginType } from "../lib/hooks/useLogin"

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isFulfilled(login, logout, me),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      )
  },
})

export const authReducer = authSlice.reducer

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(
  `${authSlice.name}/login`,
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(data)
      if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  },
)

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${authSlice.name}/logOut`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.logOut()
      if (res.data.resultCode === ResultCode.success) {
        dispatch(clearTasksAndTodolists())
        return { isLoggedIn: false }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  },
)

export const me = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${authSlice.name}/me`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.me()
      if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true }
      } else {
        return rejectWithValue(null)
      }
    }).finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
    })
  },
)
