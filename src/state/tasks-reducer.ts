import {TaskType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType ={
    type: "REMOVE-TASK"
    tasksId: string
    todolistId: string

}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

export type ActionTypes =
    RemoveTaskActionType
    | AddTaskActionType


export const tasksReducer = (state: TaskType, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(t=>t.id !== action.tasksId)
            return copyState

        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state,[action.todolistId] : [newTask, ...state[action.todolistId]]}

        default:
            return state

    }
}

export const removeTaskAC = (tasksId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", tasksId, todolistId}
}

export const addTaskAC = (title: string,  todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
