import React from 'react';
import { Button } from './Button';
import { MapTasks } from './MapTasks';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodolistPropsType ={
    title: string
    tasks: Array<TaskType>
    date?: string
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
                <div>
                    <input/>
                    <Button title={"+"} />
                </div>
                    {props.tasks.length === 0 ? (
                            <p>Тасок нет</p>) : (
                                <ul>
                                    {props.tasks.map(task => {
                                        return(
                                           <MapTasks {...task}/>
                                        )
                                    })}
                            </ul>
                        )}
                <div>
                    <Button title={"All"} />
                    <Button title={"Active"} />
                    <Button title={"Completed"} />
                <div>{props.date}</div>
                </div>
        </div>
    );
};

