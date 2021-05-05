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
    title: string
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

export const todolistsReducer = (state: Array<TodoListType>, action: ActionTypes):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this action type")

    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id
    }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistId: v1()
    }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title
    }
}
export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter
    }
}
