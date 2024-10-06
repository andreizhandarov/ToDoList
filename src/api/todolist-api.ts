import axios, { AxiosResponse } from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd5f6e719-5669-4f7d-b0a9-194fbb32bbfa',
    },
})

//type
export type TodolistType = {
    id: string
    title: string
    order: number
    addedDate: string
}

//generic CreateTodolistResponseType, UpdateTodolistResponseType, DeleteTodolistResponseType
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

//api
export const todolistAPI = {
    getTodolists(){
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists` , { title })
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
    }
}

export const taskAPI = {
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks` , { title })
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, apiModel: UpdateTaskType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, apiModel);
    }
}