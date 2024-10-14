import { Dispatch } from "redux";
import { fetchTasksTC } from "./tasks-reducer";
import { RequestStatusType, setAppStatus } from "app/app-reducer";
import { todolistAPI, TodolistType } from "api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ClearTodosDataActionType = ReturnType<typeof clearTodosDataAC>;

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ClearTodosDataActionType;

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: "all",
        entityStatus: "idle",
      };
      return [newTodolist, ...state];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl,
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl,
      );
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, entityStatus: action.status } : tl,
      );
    }
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    }
    case "CLEAR-TODOS-DATA": {
      return [];
    }
    default:
      return state;
  }
};

//Action
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    id: todolistId,
  } as const;
};

export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: "ADD-TODOLIST",
    todolist,
  } as const;
};

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todolistId,
    title,
  } as const;
};

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValuesType,
) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todolistId,
    filter,
  } as const;
};

export const changeTodolistEntityStatusAC = (
  todolistId: string,
  status: RequestStatusType,
) => {
  return {
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    id: todolistId,
    status,
  } as const;
};

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return {
    type: "SET-TODOLISTS",
    todolists,
  } as const;
};

export const clearTodosDataAC = () => ({ type: "CLEAR-TODOS-DATA" }) as const;

//Thunk
export const getTodolistsTC = () => (dispatch: any) => {
  dispatch(setAppStatus({status: "loading"}));
  todolistAPI
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatus({status: "succeeded"}));
      return res.data;
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(fetchTasksTC(tl.id));
      });
    });
};

export const deleteTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(removeTodolistAC(todolistId));
      dispatch(setAppStatus({status: "succeeded"}));
    });
  };

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({status: "loading"}));
  todolistAPI.createTodolist(title).then((res) => {
    dispatch(addTodolistAC(res.data.data.item));
    dispatch(setAppStatus({status: "succeeded"}));
  });
};

export const changeTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      dispatch(changeTodolistTitleAC(todolistId, title));
    });
  };
