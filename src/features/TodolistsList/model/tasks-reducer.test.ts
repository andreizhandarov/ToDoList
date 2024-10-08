
import { TaskPriorities, TaskStatuses } from '../../../api/todolist-api'
import { addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC } from './tasks-reducer'
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer'

let startState: TasksStateType

beforeEach(()=>{
    startState = {
        'todolistId1': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    
    const action = removeTaskAC ('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: "CSS", status: TaskStatuses.New, todoListId: 'todolistId1', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    })
})

//Add

test('correct task should be added to correct array', () => {

    // const action = addTaskAC('juce', 'todolistId2')
    const action = addTaskAC({
        todoListId: 'todolistId2',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id exists'
    })
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined() 
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

//changeTaskStatus

test('status of specified task should be changed', () => {

    const action = updateTaskAC('2', {status: TaskStatuses.Completed}, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
})

//changeTaskTitle
test('title of specified task should be changed', () => {

    const newTitle = 'juice'
    const action = updateTaskAC('1', {title: newTitle}, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].title).toBe('juice')
})

//AddTodolist
test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({id: 'todolistId3', title: 'new todolist', order: 0, addedDate: ''})
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

//revoveTodolist
    test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolista', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})

test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState["todolistId1"], 'todolistId1')
    const endState = tasksReducer({
        "todolistId2" : [],
        "todolistId1" : []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})







