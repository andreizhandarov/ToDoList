export type TodolistType = {
    id: string;
    title: string;
    order: number;
    addedDate: string;
};

export type ChangeTodolistTitleArg = {
    todolistId: string; 
    title: string;
}