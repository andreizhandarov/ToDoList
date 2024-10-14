import {
  AddTodolistActionType,
  ClearTodosDataActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { Dispatch } from "redux";
import { setAppError, setAppStatus } from "app/app-reducer";
import { taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from "api/todolist-api";
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { AppRootStateType } from "app/state/store";

export type TasksStateType = {
  [todolistId: string]: TaskType[];
};

type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>
  | ClearTodosDataActionType;

export type UpdateDomainTaskType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType,
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.id,
        ),
      };
    }
    case "ADD-TASK": {
      const newTask = action.task;
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      };
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.id ? { ...t, ...action.model } : t,
        ),
      };
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.todolist.id]: [] };
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    case "SET-TODOLISTS": {
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }
    case "SET-TASKS": {
      return { ...state, [action.todolistId]: action.tasks };
    }
    case "CLEAR-TODOS-DATA": {
      return {};
    }
    default:
      return state;
  }
};

//ActionCreat
export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK",
    id: taskId,
    todolistId,
  } as const;
};

export const addTaskAC = (task: TaskType) => {
  return {
    type: "ADD-TASK",
    task,
  } as const;
};

export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskType,
  todolistId: string,
) => {
  return {
    type: "UPDATE-TASK",
    id: taskId,
    model: model,
    todolistId: todolistId,
  } as const;
};

export const setTasksAC = (task: Array<TaskType>, todolistId: string) => {
  return {
    type: "SET-TASKS",
    tasks: task,
    todolistId: todolistId,
  } as const;
};

//ThunkCreate
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status: "loading"}));
  taskAPI
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId));
      dispatch(setAppStatus({status: "succeeded"}));
    })
    .catch((error) => {
      setAppError({error});
    });
};

export const removeTaskTC =
  (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    taskAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        dispatch(removeTaskAC(taskId, todolistId));
        dispatch(setAppStatus({status: "succeeded"}));
      })
      .catch((error) => {
        setAppError({error});
      });
  };

export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    taskAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item));
          dispatch(setAppStatus({status: "succeeded"}));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskType) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find((task) => task.id === taskId);

    if (task) {
      const apiModel: UpdateTaskType = {
        title: task.title,
        startDate: task.startDate,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        status: task.status,
        ...domainModel,
      };
      taskAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(taskId, domainModel, todolistId));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
