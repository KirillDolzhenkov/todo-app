import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType ={
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}
export type ChangeTodolistTitleActionType ={
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
export type ChangeTodolistFilterActionType ={
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValueType
    id: string
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

export const todolistsReducer = (state: Array<TodoListType>, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find(tl => tl.id === action.id );
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER":{
            let todoList = state.find(tl => tl.id === action.id );
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this action type")

    }
}

