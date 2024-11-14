import React from "react";
import Button from "@mui/material/Button"
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { changeTodolistFilter, FilterValuesType, TodolistDomainType } from "features/TodolistsList/model/todolistsSlice";

type Props = {
    todolist: TodolistDomainType
}

export const FilterTasksButton = ({todolist}: Props) => {
    const dispatch = useAppDispatch()
    
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilter({ todolistId: todolist.id, filter }))
    }

    return (
        <>
            <Button
                variant={todolist.filter === "all" ? "contained" : "text"}
                color={"inherit"}
                onClick={() => changeFilterTasksHandler("all")}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === "active" ? "contained" : "text"}
                color={"primary"}
                sx={{ m: "0 5px" }}
                onClick={() => changeFilterTasksHandler("active")}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === "completed" ? "contained" : "text"}
                color={"secondary"}
                onClick={() => changeFilterTasksHandler("completed")}
            >
                Completed
            </Button>
        </>
    );
};




