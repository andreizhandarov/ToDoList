
import { thunk, ThunkDispatch} from 'redux-thunk';
import { Action, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import { useDispatch } from 'react-redux';
import { tasksReducer } from '../../features/TodolistsList/model/tasks-reducer';
import { todolistsReducer } from '../../features/TodolistsList/model/todolists-reducer';
import { appReducer } from '../app-reducer';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk) as any);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, Action>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// @ts-ignore
window.store = store
