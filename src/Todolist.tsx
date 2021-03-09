import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";



export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    setFilterValue: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDoneValue: boolean) => void
    filter: FilterValueType
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<null | string>(null)
    let addTask = () => {
        if (inputValue.trim()) {
            props.addTask(inputValue);
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
    }
    const onAllClickHandler = () => props.setFilterValue("all")
    const onActiveClickHandler = () => props.setFilterValue("active")
    const onCompletedClickHandler = () => props.setFilterValue("completed")

    return (
        <div>
            <div>
                <h3>What to learn</h3>
                <div>
                    <input
                        value={inputValue}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? "error" : ""}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className={"error-message"}>Title is required</div>}
                </div>
                <ul>
                    {props.tasks.map(t => <li className={t.isDone ? "isDone" : ""}><input
                        type="checkbox" checked={t.isDone}
                        onChange={e => props.changeStatus(t.id, e.currentTarget.checked)}
                    /> <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>X</button>
                    </li>)}
                </ul>
                <div>
                    <button className={props.filter === "all"? "active-filter": "" } onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === "active"? "active-filter": "" } onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === "completed"? "active-filter": "" } onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
}