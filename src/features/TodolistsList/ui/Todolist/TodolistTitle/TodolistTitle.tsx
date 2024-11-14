import React from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { changeTodolistTitle, deleteTodolist, TodolistDomainType } from 'features/TodolistsList/model/todolistsSlice';
import IconButton from "@mui/material/IconButton"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan';

type Props = {
    todolist: TodolistDomainType
}

export const TodolistTitle = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const removeTodolistHandler = () => {
        dispatch(deleteTodolist(todolist.id))
    }
    
    const changeTodolistTitleHandler = (newTitle: string) => {
        dispatch(changeTodolistTitle({ todolistId: todolist.id, title: newTitle }))
    }
    return (
        <>
            <h3>
                <EditableSpan title={todolist.title} changeTitle={changeTodolistTitleHandler} />
                <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
                    <Delete />
                </IconButton>
            </h3>
        </>
    );
};
