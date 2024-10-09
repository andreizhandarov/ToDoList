import { Dispatch } from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setIsInitializedAC, SetIsInitializedActionType} from '../../app/app-reducer'
import { LoginType } from './Login'
import { authAPI } from '../../api/todolist-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { clearTodosDataAC, ClearTodosDataActionType } from '../TodolistsList/model/todolists-reducer'

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetIsInitializedActionType
    | ClearTodosDataActionType

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return { ...state, isLoggedIn: action.value }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value }) as const

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const result = await authAPI.login(data)
        if(result.data.resultCode === 0){
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }else{
            handleServerAppError(result.data, dispatch)
        }
    }catch(e){
        handleServerNetworkError((e as any), dispatch)
    }
}

export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const result = await authAPI.logOut()
        if(result.data.resultCode === 0){
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(clearTodosDataAC())
        }else{
            handleServerAppError(result.data, dispatch)
        }
    }catch(e){
        handleServerNetworkError((e as any), dispatch)
    }
}

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try{
        const result = await authAPI.me()
        if(result.data.resultCode === 0){
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }else{
            handleServerAppError(result.data, dispatch)
        }
    }catch(e){
        handleServerNetworkError((e as any), dispatch)
    }
    dispatch(setIsInitializedAC(true))
}
