import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppRootStateType, AppDispatch } from "app/state/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType, 
    dispatch: AppDispatch, 
    rejectValue: null
}>()