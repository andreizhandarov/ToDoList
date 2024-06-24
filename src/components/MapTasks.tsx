import React from 'react';
import { TaskType } from '../components/Todolist';


export const MapTasks = (props: TaskType) => {
    return (
        <li key={props.id}>
            <input type="checkbox" checked={props.isDone}/> 
            <span>{props.title}</span>
        </li>
    );
};
