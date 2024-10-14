import AppBar from "@mui/material/AppBar";
import { AddItemForm } from "../components/AddItemForm/AddItemForm";
import "./App.css";
import { Todolist } from "../features/TodolistsList/Todolist/Todolist";
import { useState } from "react";
import { v1 } from "uuid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { MenuButton } from "../components/MenuButton/MenuButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolist-api";
import {
  FilterValuesType,
  TodolistDomainType,
} from "../features/TodolistsList/model/todolists-reducer";

type ThemeMode = "dark" | "light";

export type TasksStateType = {
  [todolistId: string]: TaskType[];
};

function App() {
  const todolistId_1 = v1();
  const todolistId_2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {
      id: todolistId_1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
    {
      id: todolistId_2,
      title: "What to bye",
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todolistId_1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: todolistId_1,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: todolistId_1,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.New,
        todoListId: todolistId_1,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    [todolistId_2]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: todolistId_2,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: todolistId_2,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.New,
        todoListId: todolistId_2,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  });

  //Tasks
  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
    });
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      status: TaskStatuses.New,
      todoListId: todolistId,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
    };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const changeTaskStatus = (
    taskId: string,
    status: TaskStatuses,
    todolistId: string,
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id == taskId ? { ...t, status: status } : t,
      ),
    });
  };

  const changeTaskTitle = (
    taskId: string,
    title: string,
    todolistId: string,
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id == taskId ? { ...t, title: title } : t,
      ),
    });
  };

  //ToDoLista
  const addTodolist = (title: string) => {
    const todolistId = v1();
    const newTodo: TodolistDomainType = {
      id: todolistId,
      title: title,
      filter: "all",
      order: 0,
      addedDate: "",
      entityStatus: "idle",
    };
    const nexState: Array<TodolistDomainType> = [...todolists, newTodo];
    setTodolists(nexState);
    setTasks({ ...tasks, [todolistId]: [] });
  };

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    setTodolists(
      todolists.map((tl) =>
        tl.id === todolistId ? { ...tl, filter: filter } : tl,
      ),
    );
  };

  const changeTodolistTitle = (title: string, todolistId: string) => {
    setTodolists(
      todolists.map((tl) =>
        tl.id === todolistId ? { ...tl, title: title } : tl,
      ),
    );
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== todolistId));
    delete tasks[todolistId];
  };

  //UI
  const todolistsComp: Array<JSX.Element> = todolists.map((tl) => {
    let tasksForTodolist = tasks[tl.id];
    if (tl.filter === "active") {
      tasksForTodolist = tasksForTodolist.filter((task) => !task.status);
    }

    if (tl.filter === "completed") {
      tasksForTodolist = tasksForTodolist.filter((task) => task.status);
    }

    return (
      <Grid>
        <Paper sx={{ p: "15px" }} elevation={8}>
          <Todolist
            todolist={tl}
            key={tl.id}
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
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#ef6c00",
      },
    },
  });

  const onChangeHandler = () => {
    setThemeMode(themeMode == "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: "15px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton sx={{ background: "#ab47bc" }}>FAQ</MenuButton>
            <Switch color={"default"} onChange={onChangeHandler} />
          </div>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container sx={{ p: "15px 0" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>

        <Grid container spacing={4}>
          {todolistsComp}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
