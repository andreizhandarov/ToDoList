import { AppRootStateType } from "app/state/store"
import { ThunkDispatch } from "redux-thunk"
import { handleServerNetworkError } from "./handle-server-network-error";
import { setAppStatus } from "app/appSlice";

export const thunkTryCatch = async <T>(
    thunkAPI: {
        dispatch: ThunkDispatch<AppRootStateType, undefined, any>,
        getState: () => AppRootStateType,
        rejectWithValue: (value: any) => any
    },
    logic: () => Promise<T>,
    ): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
        const { dispatch, rejectWithValue } = thunkAPI;
    try {
        dispatch(setAppStatus({ status: "loading" }));
        return await logic()
    }catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(error)
    }finally {
        dispatch(setAppStatus({ status: "idle" }));
    }
}
