import { TodolistType } from "api/todolist-api"
import { tasksReducer, TasksStateType } from "./tasksSlice"
import { addTodolist, TodolistDomainType, todolistsReducer } from "./todolistsSlice"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: TodolistDomainType[] = []

  let todolist: TodolistType ={
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0
  }

  const action = addTodolist({todolist})

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
