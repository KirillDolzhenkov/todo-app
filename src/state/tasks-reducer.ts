import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    tasksId: string
    todolistId: string

}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}

export type ActionTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType


export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id !== action.tasksId)
            return copyState
        }

        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': { // used .map (but used .find at App)

            let copyState = {...state}
            let updateTask = copyState[action.todolistId].map(task => {
                if (task.id === action.taskId) {
                    return {...task, isDone: action.isDone}
                } else {
                    return task
                }
            })
            return {
                ...state,
                [action.todolistId]: updateTask
            }
        }
        case "CHANGE-TASK-TITLE":
            let copyState = {...state}
            let tasks = copyState[action.todolistId]
            let task =  tasks.find(t => t.id === action.taskId);
           /* if (changedValue) {
                changedValue.title = editTitle;
                return setTaskData({...tasksData})*/
            if (task) {
                task.title = action.title
            }
                return copyState
        default:
            return state

    }
}

export const removeTaskAC = (tasksId: string, todolistId: string): RemoveTaskActionType => {
    return {
        type: "REMOVE-TASK",
        tasksId,
        todolistId}

}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId
    }
}
