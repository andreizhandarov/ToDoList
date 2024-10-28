import { instance } from "common/api/common.api";
import {BaseResponse} from "common/types/types"

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
        return instance.post<BaseResponse<{ item: TodolistType }>>(`todo-lists`, {title});
},
    deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}`);
},
    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponse>(`todo-lists/${todolistId}`, { title });
    },
};


