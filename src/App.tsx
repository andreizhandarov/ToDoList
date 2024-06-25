import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./components/Todolist";

export type FilterValuesType = "All" | "Active" | "Completed"

function App() {
  const [tasks, setTasks] = useState<TaskType[]> ([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Typescript", isDone: true },
    { id: 6, title: "RTK query", isDone: false },
  ])

  const removeTask = (tasksID: number)=>{
    const filterTasks = tasks.filter(el => el.id !== tasksID)
    setTasks(filterTasks);
  }

  return (
    <div className="App">
      <Todolist title="What to learn" 
                tasks={tasks} 
                removeTask={removeTask}
                />
    </div>
  );
}

export default App;
