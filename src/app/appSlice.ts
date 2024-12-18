import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending, (state) => {
          state.status = "loading"
        }
      )
      .addMatcher(
        isFulfilled, (state) => {
          state.status = "succeeded"
        }
      )
      .addMatcher(
        isRejected, (state, action: any) => {
          state.status = "failed"
          state.error = action.error.message
        }
      )
    }
})

export const appReducer = appSlice.reducer
export const { setAppStatus, setAppError, setIsInitialized } = appSlice.actions
export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
