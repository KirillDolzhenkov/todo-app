import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";



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
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    let addTask = (title: string) => props.addTask(title, props.todolistID )

   /* let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<null | string>(null)

    let addTask = () => {
        if (inputValue.trim()) {
            props.addTask(inputValue, props.todolistID);
            setInputValue('');
        } else {
           setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>(setInputValue(e.currentTarget.value));
    const onKeyPressHandler = (e: KeyboardEvent) => {
        setError(null)
        if (e.charCode === 13) {
            addTask();
        }
    }*/

    const onAllClickHandler = () => props.setFilterValue("all", props.todolistID)
    const onActiveClickHandler = () => props.setFilterValue("active", props.todolistID)
    const onCompletedClickHandler = () => props.setFilterValue("completed", props.todolistID)

    return (
        <div>
            <h3>What to learn <button onClick={()=>{props.removeTodolist(props.todolistID)}}>X</button> </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>
                <input value={inputValue}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>Title is required</div>}
            </div>*/}
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTask = () => props.removeTask(t.id, props.todolistID);
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.todolistID);
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "isDone" : ""}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeTaskStatus}
                                />
                                <span>{t.title}</span>
                                <button onClick={removeTask}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}