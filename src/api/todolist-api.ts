import axios, { AxiosResponse } from "axios";
import { LoginType } from "../features/Login/Login";
import { UpdateDomainTaskType } from "features/TodolistsList/model/tasksSlice";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "d5f6e719-5669-4f7d-b0a9-194fbb32bbfa",
  },
});

//type
export type TodolistType = {
  id: string;
  title: string;
  order: number;
  addedDate: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

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

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

type UserType = {
  id: number;
  email: string;
  login: string;
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

export type ChangeTodolistTitleArg = {
  todolistId: string; 
  title: string;
}

//api
export const authAPI = {
  login(data: LoginType) {
    return instance.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>>,
      LoginType
    >(`auth/login`, data);
  },
  logOut() {
    return instance.delete<ResponseType>(`auth/login`);
  },
  me() {
    return instance.get<ResponseType<UserType>>(`auth/me`);
  },
};

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
