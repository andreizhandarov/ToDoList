import { instance } from "common/api/common.api";
import {ResponseType} from "common/types/types"

//type
export type TodolistType = {
    id: string;
    title: string;
    order: number;
    addedDate: string;
};

export type ChangeTodolistTitleArg = {
    todolistId: string; 
    title: string;
}

//api
export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title});
},
    deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
},
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title });
    },
};


