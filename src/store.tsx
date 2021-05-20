import {todolistsReducer} from "./state/todolists-reducer";
import {tasksReducer} from "./state/tasks-reducer";
import {combineReducers, createStore} from 'redux'

export type AppRootStateType = ReturnType<typeof RootReducer>

const RootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});


export const store = createStore(RootReducer);


// @ts-ignore
window.store = store