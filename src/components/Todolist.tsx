import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";
import { FilterValuesType } from "../App";
import { Input } from "./Input";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (tasksID: string) => void;
  addTask: (titleTask: string) => void;
};

export const Todolist = ({title, tasks, removeTask, addTask}: TodolistPropsType) => {
  const [valueFilter, setValueFilter] = useState<FilterValuesType>("All");
  const filterTask = (valueFilter: FilterValuesType) => {
    setValueFilter(valueFilter);
  };

  const FilterFoo = () => {
    let filterValueTask = tasks;

    if (valueFilter === "Active") {
      filterValueTask = tasks.filter((el) => el.isDone === true);
    }
    if (valueFilter === "Completed") {
      filterValueTask = tasks.filter((el) => el.isDone === false);
    }
    return filterValueTask;
  };

  let filtredForMap = FilterFoo();

  const [taskTitle, setTastTitle] = useState("");

  const addTaskHandler = () => {
    addTask(taskTitle);
    setTastTitle("");
  };

  const filterTaskAll = () => {
    filterTask("All");
  };
  const filterTaskActive = () => {
    filterTask("Active");
  };
  const filterTaskCompleted = () => {
    filterTask("Completed");
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <Input taskTitle={taskTitle} setTastTitle={setTastTitle} callBack={addTaskHandler} />
        <Button title={"+"} onClick={addTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {filtredForMap.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id);
            };
            return (
              <li key={task.id}>
                <Button onClick={removeTaskHandler} title={"x"} />
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title={"All"} onClick={filterTaskAll} />
        <Button title={"Active"} onClick={filterTaskActive} />
        <Button title={"Completed"} onClick={filterTaskCompleted} />
      </div>
    </div>
  );
};
