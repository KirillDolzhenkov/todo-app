import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    editTitle: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}

/*type ActionType = {
    type: string
    [key: string]: any
}*/

export type ActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistID_1 = v1();
export const todolistID_2 = v1();


const initialState: Array<TodoListType> = [
    {id: todolistID_1, title: "What to learn", filter: 'all'},
    {id: todolistID_2, title: "What to buy", filter: 'all'},
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
        }
        /*        case 'CHANGE-TODOLIST-TITLE': {
                    let todoList = state.find(tl => tl.id === action.id);
                    if (todoList) {
                        todoList.title = action.title
                    }
                    return [...state]
                }*/
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.editTitle} : tl);
        /*case "CHANGE-TODOLIST-FILTER": {
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }*/
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}

export const changeTodolistTitleAC = (editTitle: string, id: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, editTitle}
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}
