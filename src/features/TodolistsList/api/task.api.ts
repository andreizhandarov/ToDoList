import { AxiosResponse } from "axios";
import { instance } from "common/api/common.api";
import { BaseResponse } from "common/types/types";
import { AddTaskArgs, GetTasksResponse, TaskType, UpdateTaskType } from "./taskApiTypes";

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(arg: AddTaskArgs) {
        const {todolistId, title} = arg
        return instance.post<BaseResponse<{ item: TaskType }>>(
        `todo-lists/${todolistId}/tasks`, { title });
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
        `todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, apiModel: UpdateTaskType) {
        return instance.put<
        BaseResponse<{ item: TaskType }>,
        AxiosResponse<BaseResponse<{ item: TaskType }>>,
        UpdateTaskType
        >(`todo-lists/${todolistId}/tasks/${taskId}`, apiModel);
    },
};