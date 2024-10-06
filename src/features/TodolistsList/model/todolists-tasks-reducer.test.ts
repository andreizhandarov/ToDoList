
import { tasksReducer, TasksStateType } from "./tasks-reducer"
import { addTodolistAC, TodolistDomainType, todolistsReducer } from "./todolists-reducer"


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const action = addTodolistAC({id: 'todolistId3', title: 'new todolist', order: 0, addedDate: ''})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})
