import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  deleteTodolistTC,
  FilterValuesType,
  getTodolistsTC,
  TodolistDomainType,
} from "./model/todolists-reducer";
import {
  addTaskTC,
  removeTaskTC,
  TasksStateType,
  updateTaskTC,
} from "./model/tasks-reducer";
import { TaskStatuses } from "../../api/todolist-api";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/Todolist";
import { useAppDispatch, useAppSelector } from "../../app/state/store";
import { Navigate } from "react-router-dom";

export const TodolistsList: React.FC = () => {
  const todolists = useAppSelector<Array<TodolistDomainType>>(
    (state) => state.todolists,
  );
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks);
  const isLoggenIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggenIn) {
      return;
    }
    dispatch(getTodolistsTC());
  }, []);

  //Tasks
  const removeTask = useCallback((taskId: string, todolistId: string) => {
    const thunk = removeTaskTC(taskId, todolistId);
    dispatch(thunk);
  }, []);

  const addTask = useCallback((title: string, todolistId: string) => {
    const thunk = addTaskTC(title, todolistId);
    dispatch(thunk);
  }, []);

  const changeTaskStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      const thunk = updateTaskTC(todolistId, taskId, { status });
      dispatch(thunk);
    },
    [],
  );

  const changeTaskTitle = useCallback(
    (taskId: string, title: string, todolistId: string) => {
      const thunk = updateTaskTC(todolistId, taskId, { title });
      dispatch(thunk);
    },
    [],
  );

  //ToDoLista
  const addTodolist = useCallback((title: string) => {
    const thunk = addTodolistTC(title);
    dispatch(thunk);
  }, []);

  const changeFilter = useCallback(
    (filter: FilterValuesType, todolistId: string) => {
      const action = changeTodolistFilterAC(todolistId, filter);
      dispatch(action);
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    (title: string, todolistId: string) => {
      const thunk = changeTodolistTitleTC(todolistId, title);
      dispatch(thunk);
    },
    [],
  );

  const removeTodolist = useCallback((todolistId: string) => {
    const thunk = deleteTodolistTC(todolistId);
    dispatch(thunk);
  }, []);

  if (!isLoggenIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container sx={{ p: "15px 0" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4}>
        {todolists.map((tl) => {
          let tasksForTodolist = tasks[tl.id];

          return (
            <Grid key={tl.id}>
              <Paper sx={{ p: "15px" }} elevation={8}>
                <Todolist
                  todolist={tl}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
