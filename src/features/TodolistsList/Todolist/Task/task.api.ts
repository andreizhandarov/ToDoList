import { AxiosResponse } from "axios";
import { instance } from "common/api/common.api";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";
import { UpdateDomainTaskType } from "features/TodolistsList/model/tasksSlice";
import {ResponseType} from "common/types/types"

export type TaskType = {
    description: string;
    title: string;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};

export type UpdateTaskType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};

export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};

export type AddTaskArgs = {
    todolistId: string, 
    title: string
};

export type UpdateTaskArg = {
    taskId: string; 
    domainModel: UpdateDomainTaskType; 
    todolistId: string;
}

export type RemoveTaskArg = {
    taskId: string; 
    todolistId: string;
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(arg: AddTaskArgs) {
        const {todolistId, title} = arg
        return instance.post<ResponseType<{ item: TaskType }>>(
        `todo-lists/${todolistId}/tasks`, { title });
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
        `todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, apiModel: UpdateTaskType) {
        return instance.put<
        ResponseType<{ item: TaskType }>,
        AxiosResponse<ResponseType<{ item: TaskType }>>,
        UpdateTaskType
        >(`todo-lists/${todolistId}/tasks/${taskId}`, apiModel);
    },
};