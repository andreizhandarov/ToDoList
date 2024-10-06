import { Dispatch } from "redux"
import { ResponseType } from "../api/todolist-api"
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../app/app-reducer"

type ErrorUtilsDispatchType = Dispatch<SetAppStatusActionType | SetAppErrorActionType>

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    }else{
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}