import { Dispatch } from 'redux'

export type ThemeModes = 'dark' | 'light';

const initialState = {
    mode: 'light',
}

type InitialStateType = typeof initialState

export type SetThemeActionType = ReturnType<typeof setThemeAC>
// types
type ActionsType =
    | SetThemeActionType

export const themeReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-THEME':
            return { ...state, mode: action.value}
        default:
            return state
    }
}
// actions
export const setThemeAC = (value: ThemeModes) => ({ type: 'SET-THEME',  value}) as const

// thunks
export const setThemeTC = (theme: ThemeModes) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setThemeAC(theme))
}
