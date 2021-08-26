import React from "react";
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from "../App";


export type removeTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type addTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistID: string
}
type changeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
type changeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type todolistsAT = removeTodolistAT
    | addTodolistAT
    | changeTodolistTitleAT
    | changeTodolistFilterAT

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

const todolistsReducer = (state: Array<TodolistType> = initialState, action: todolistsAT): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.id);
        }
        case "ADD-TODOLIST": {
            const newTodolistId = action.todolistID
            const newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: "all"}
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title
                return [...state]
            }
            return state;
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter
                return [...state]
            }
            return state;
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string): removeTodolistAT => {
    return {type: "REMOVE-TODOLIST", id}
}
export const addTodolistAC = (title: string): addTodolistAT => {
    return {type: "ADD-TODOLIST", title, todolistID: v1()}
}
export const changeTodolistTitleAC = (title: string, id: string): changeTodolistTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", title, id}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): changeTodolistFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, id}
}

export {
    todolistsReducer
}