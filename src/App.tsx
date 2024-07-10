import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "All" | "Active" | "Completed"

function App() {
  const [tasks, setTasks] = useState<TaskType[]> ([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: true },
    { id: v1(), title: "RTK query", isDone: false },
  ])

  const removeTask = (tasksID: string)=>{
    const filterTasks = tasks.filter(el => el.id !== tasksID)
    setTasks(filterTasks);
  }

  const addTask = (titleTask: string) =>{
    const newTitleTasks = { id: v1(), 
                            title: titleTask, 
                            isDone: false};
    setTasks([newTitleTasks, ...tasks]);
  }

  const chengeTask = (event : boolean, taskID : string) => {
    setTasks(tasks.map((el) => el.id === taskID ? {...el, isDone : event} : el))
  }

  return (
    <div className="App">
      <Todolist title="What to learn" 
                tasks={tasks} 
                removeTask={removeTask}
                addTask={addTask}
                chengeTask={chengeTask}
                />
    </div>
  );
}

export default App;
