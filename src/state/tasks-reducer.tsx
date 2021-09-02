import React from "react";
import {TasksStateType} from "../App";
import {removeTodolistAT, addTodolistAT, todolistId1, todolistId2} from "./todolists-reducer";
import {v1} from "uuid";


type removeTaskAT = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string

}
type addTaskAT = {
    type: "ADD-TASK"
    todolistID: string
    title: string
}
type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    isDone: boolean
    todolistID: string
}
type changeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    title: string
    todolistID: string
}


export type tasksAT = removeTaskAT
    | addTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | addTodolistAT
    | removeTodolistAT



const initialState = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

const tasksReducer = (state: TasksStateType = initialState, action: tasksAT): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID];
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistID] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            let task = {id: v1(), title: action.title, isDone: false};
            //достанем нужный массив по todolistId:
            let todolistTasks = stateCopy[action.todolistID];
            // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
            stateCopy[action.todolistID] = [task, ...todolistTasks];
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            /*const stateCopy = {...state}*/

            //достанем нужный массив по todolistId:
            let todolistTasks = state[action.todolistID]; // deleted stateCopy
            // найдём нужную таску:
            let task = todolistTasks.find(t => t.id === action.taskID);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.isDone;
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            }
            state[action.todolistID] = [...todolistTasks] //fix
            return ({...state});

        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            //достанем нужный массив по todolistId:
            let todolistTasks = stateCopy[action.todolistID];
            // найдём нужную таску:
            let task = todolistTasks.find(t => t.id === action.taskID);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
                return stateCopy;
            }
            return state;
        }
        case "ADD-TODOLIST":{
            const copyState = {...state}
            copyState[action.todolistID] = []
            return copyState;
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): removeTaskAT => {
    return {type: "REMOVE-TASK", taskID, todolistID}
}
export const addTaskAC = (title: string, todolistID: string): addTaskAT => {
    return {type: "ADD-TASK", title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): changeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): changeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todolistID}
}

export {
    tasksReducer
}