import React, { ChangeEvent, useCallback } from 'react';
import { TaskType } from './AppWithRedux';
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "./EditableSpan";
import { getListItemSx } from './Todolist.style';
import { useDispatch } from 'react-redux';
import { removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from '../src/model/tasks-reducer';


type TaskPropsType = {
	task: TaskType,
	todolistId: string
}

export const TaskWithRedux = React.memo((props: TaskPropsType) => {
    const { task, todolistId } = props;
    const dispatch = useDispatch();

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(task.id, todolistId));
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newStatusValue, todolistId));
    }

    const changeTaskTitleCallback = (newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistId));
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
        <div>
            <Checkbox
                color={'secondary'}
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
        />
            <EditableSpan title={task.title} changeTitle={changeTaskTitleCallback} />
        </div>

        <IconButton onClick={removeTaskHandler}>
            <Delete />
        </IconButton>
        </ListItem>
    );
});
