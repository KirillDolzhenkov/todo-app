import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType, TodoListType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";



export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistID: string) => void
    setFilterValue: (value: FilterValueType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatus: (taskId: string, isDoneValue: boolean, todolistID: string) => void
    changeTaskTitle: (taskId: string, editTitle: string, todolistID: string) => void
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (editTitle: string, todolistID: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    let addTask = (title: string) => props.addTask(title, props.todolistID )

    const onAllClickHandler = () => props.setFilterValue("all", props.todolistID)
    const onActiveClickHandler = () => props.setFilterValue("active", props.todolistID)
    const onCompletedClickHandler = () => props.setFilterValue("completed", props.todolistID)
    const changeTlTitle = (editTitle: string) => {
        props.changeTodolistTitle(editTitle, props.todolistID)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTlTitle}/>
                {/*<button onClick={()=>{props.removeTodolist(props.todolistID)}}>X</button>*/}

                <IconButton onClick={()=>{props.removeTodolist(props.todolistID)}}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: "none", padding: 0}}>

                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id, props.todolistID);
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.todolistID);
                        }
                        const changeTaskTitle = (editTitle: string) => {
                            props.changeTaskTitle(t.id, editTitle, props.todolistID)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "isDone" : ""}>

                                <Checkbox
                                    color={"primary"}
                                    checked={t.isDone}
                                    onChange={changeTaskStatus}
                                />
                                {/*<input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeTaskStatus}
                                />*/}
                                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                                {/*<button onClick={removeTask}>X</button>*/}
                                <IconButton onClick={removeTask}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button style={{marginRight: "5px"}}
                        color={"primary"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        /*className={props.filter === "all" ? "active-filter" : ""}*/
                        onClick={onAllClickHandler}>All</Button>
                <Button style={{marginRight: "5px"}}
                        color={"primary"}
                        variant={props.filter === "active" ? "contained" : "outlined"}
                        /*className={props.filter === "active" ? "active-filter" : ""}*/
                        onClick={onActiveClickHandler}>Active</Button>
                <Button style={{marginRight: "5px"}}
                        color={"primary"}
                        variant={props.filter === "completed" ? "contained" : "outlined"}
                        /*className={props.filter === "completed" ? "active-filter" : ""}*/
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}