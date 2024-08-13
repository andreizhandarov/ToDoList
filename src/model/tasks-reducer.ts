import { v1 } from "uuid"
import {TaskType, TasksStateType} from "../App"

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        id: string
        todolistId : string
    }
}

export type AddTaskActionType = {
  type: 'ADD-TASK'
  payload: {
      title: string
      todolistId : string
      
  }
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  payload: {
      id: string
      taskStatus: boolean
      todolistId: string
  }
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  payload: {
      id: string
      title: string
      todolistId: string
  }
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {
          const newTask: TaskType = {
            id: v1(),
            title: action.payload.title,
            isDone: false
          }
          return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]}
        }
        case 'CHANGE-TASK-STATUS': {
          return{
            ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id == action.payload.id ? {...t, isDone: action.payload.taskStatus} : t)
          }
        }
        case 'CHANGE-TASK-TITLE': {
          return{
            ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id == action.payload.id ? {...t, title: action.payload.title} : t)
          }
        }
        default:
          throw new Error("I don't understand this type")
      }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { 
    type: 'REMOVE-TASK', 
    payload: { 
      id: taskId,
      todolistId: todolistId 
    }
  } as const
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { 
    type: 'ADD-TASK', 
    payload: { 
      title: title,
      todolistId: todolistId 
    }
  } as const
}

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId : string): ChangeTaskStatusActionType => {
  return { 
    type: 'CHANGE-TASK-STATUS', 
    payload: { 
      id: taskId,
      taskStatus: taskStatus,
      todolistId: todolistId 
    }
  } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId : string): ChangeTaskTitleActionType => {
  return { 
    type: 'CHANGE-TASK-TITLE', 
    payload: { 
      id: taskId,
      title: title,
      todolistId: todolistId 
    }
  } as const
}

