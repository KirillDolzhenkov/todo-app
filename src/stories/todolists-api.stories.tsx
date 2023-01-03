import React, {useEffect, useState} from 'react'
import {TodolistApi} from "../todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        TodolistApi
            .getTodos()
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let title = "Test"
    useEffect(() => {
        TodolistApi
            .createTodo(title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "0e723aeb-ab74-4687-945e-7869af128f3b"
        TodolistApi
            .deleteTodo(todoId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "218e812d-6278-48d5-bca4-fbb2fc9c8d63"
        const title = "Vue2"
        TodolistApi
            .updateTodoTitle({todoId, title})
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export  const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todoId = "218e812d-6278-48d5-bca4-fbb2fc9c8d63"
        TodolistApi
            .getTasks(todoId)
            .then((response)=>{
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export  const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todoId = "218e812d-6278-48d5-bca4-fbb2fc9c8d63"
        const title = "title2"
        TodolistApi
            .createTasks({todoId, title})
            .then((response)=>{
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export  const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todoId = "218e812d-6278-48d5-bca4-fbb2fc9c8d63"
        const taskId = "8ca4fc20-a108-4781-87b7-2f8ea98e5701"
        TodolistApi
            .deleteTasks({todoId, taskId})
            .then((response)=>{
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export  const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(()=>{
        const todoId = "218e812d-6278-48d5-bca4-fbb2fc9c8d63"
        const taskId = "f487669e-d113-465e-b2a4-93d511fee6c6"
        const title = "NEXT123"
        TodolistApi
            .updateTasksTitle({todoId, taskId, title})
            .then((response)=>{
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}