import React from 'react';
import { TaskStatuses } from 'common/enums/enums';
import { TaskType } from 'features/TodolistsList/api/taskApiTypes';
import { TodolistDomainType } from 'features/TodolistsList/model/todolistsSlice';
import List from "@mui/material/List"
import { Task } from '../../Task/Task';

type Props = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const TasksForTodolist = ({todolist, tasks}: Props) => {

    let tasksForTodolist = tasks

    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter((task) => task.status === TaskStatuses.New)
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter((task) => task.status === TaskStatuses.Completed)
    }

    return (
        <>
            {tasks?.length === 0 ? (
                <p>There are no tasks</p>
            ) : (
            <List>
                {tasksForTodolist?.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        todolistId={todolist.id}
                    />
                ))}
            </List>
            )}   
        </>
    );
};
