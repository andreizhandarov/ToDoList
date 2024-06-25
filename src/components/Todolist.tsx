import React, { useState } from "react";
import { Button } from "./Button";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (tasksID: number) => void;
};

export const Todolist = ({ title, tasks, removeTask }: TodolistPropsType) => {
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

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title={"+"} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {filtredForMap.map((task) => {
            return (
              <li key={task.id}>
                <Button onClick={() => removeTask(task.id)} title={"x"} />
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title={"All"} onClick={() => filterTask("All")} />
        <Button title={"Active"} onClick={() => filterTask("Active")} />
        <Button title={"Completed"} onClick={() => filterTask("Completed")} />
      </div>
    </div>
  );
};
