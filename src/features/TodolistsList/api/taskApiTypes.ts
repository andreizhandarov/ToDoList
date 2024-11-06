import { TaskPriorities, TaskStatuses } from "common/enums/enums";

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
    domainModel: Partial<UpdateTaskType>; 
    todolistId: string;
}

export type RemoveTaskArg = {
    taskId: string; 
    todolistId: string;
}