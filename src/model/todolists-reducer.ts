
import { FilterValuesType, TodolistType } from "../AppWithRedux/hooks/useAppWithRedux"

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  payload: {
    id: string
  }
}

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  payload: {
    id: string
    title: string
  }
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  payload: {
    id: string
    title: string
  }
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  payload: {
    id: string
    filter: FilterValuesType
  }
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
          return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
          const newTodolist: TodolistType = {
            id: action.payload.id,
            title: action.payload.title,
            filter: 'all'
          }
          return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
          return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title}: tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
          return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter}: tl)
        }
        default:
          return state
      }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { 
    type: 'REMOVE-TODOLIST', 
    payload: { 
      id: todolistId 
    }
  } as const
}

export const addTodolistAC = (todolistId: string, title: string): AddTodolistActionType => {
  return { 
    type: 'ADD-TODOLIST', 
    payload: {
      id: todolistId, 
      title
    } 
  } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return { 
    type: 'CHANGE-TODOLIST-TITLE', 
    payload: { 
      id: todolistId, 
      title 
    } 
  } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return { 
    type: 'CHANGE-TODOLIST-FILTER', 
    payload: { 
      id: todolistId, 
      filter 
    } 
  } as const
}