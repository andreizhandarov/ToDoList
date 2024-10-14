import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";

export default {
  title: "API/TODOLISTS",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings).then(res => {setState(res.data)})
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{ title: 'newTodolist2' }, settings).then(res => {setState(res.data)})
    todolistAPI.createTodolist("NewTodolist").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "065ac327-4782-4cf1-92f9-c60d399842f4";
    // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    //     .then(res => {setState(res.data)})
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{ title: 'React' },settings)
    //     .then(res => {setState(res.data)})
    const todolistId = "7689a44c-66c9-4a08-8bd3-57387c81185e";
    todolistAPI.updateTodolist(todolistId, "SOME NEW TITLE").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
