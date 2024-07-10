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
  chengeTask: (event : boolean, taskID : string) => void;
};

export const Todolist = ({title, tasks, removeTask, addTask, chengeTask}: TodolistPropsType) => {
  const [valueFilter, setValueFilter] = useState<FilterValuesType>("All");
  const [error, setError] = useState<string | null>(null);
  const [taskTitle, setTastTitle] = useState("");

  const filterTask = (valueFilter: FilterValuesType) => {
    setValueFilter(valueFilter);
    setValueFilter(valueFilter)
  };

  const FilterFoo = () => {
    let filterValueTask = tasks;

    if (valueFilter === "Active") {
      filterValueTask = tasks.filter((el) => !el.isDone);
    }
    if (valueFilter === "Completed") {
      filterValueTask = tasks.filter((el) => el.isDone);
    }
    return filterValueTask;
  };

  let filtredForMap = FilterFoo();

  const addTaskHandler = () => {
    if(taskTitle.trim() != ''){
      addTask(taskTitle);
      setTastTitle('');
    }else{
      setError('Title is required')
    }
  };

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTastTitle(e.currentTarget.value);
  };

  const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
      <input
					className={error ? 'error' : ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
        <Button title={"+"} onClick={addTaskHandler} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {filtredForMap.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id);
            };
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              chengeTask(e.currentTarget.checked, task.id);
            };
            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Button onClick={removeTaskHandler} title={"x"} />
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button className={valueFilter === 'All' ? 'active-filter' : ''} title={"All"} onClick={()=>filterTask("All")} />
        <Button className={valueFilter  === 'Active' ? 'active-filter' : ''} title={"Active"} onClick={()=>filterTask("Active")} />
        <Button className={valueFilter  === 'Completed' ? 'active-filter' : ''} title={"Completed"} onClick={()=>filterTask("Completed")} />
      </div>
    </div>
  );
};
