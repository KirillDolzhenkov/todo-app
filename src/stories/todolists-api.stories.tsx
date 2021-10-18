import React, {useEffect, useState} from 'react';
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

//TodoLists:
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistApi.getTodos()
        .then((res)=>{
            let todos = res.data
            setState(todos);
        })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REACT'

        todolistApi.createTodo(title)
        .then((res)=>{
            setState(res.data.data.item);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1630a4f1-e303-4502-ba77-c5511b00bcbd';

        todolistApi.deleteTodo(todolistId)
        .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0e723aeb-ab74-4687-945e-7869af128f3b'
        const title = 'ANGULAR'

        todolistApi.updateTodolistTitle(todolistId, title)
        .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

//Tasks:
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a450f9c3-fa66-4d8a-adc3-94e8d7fda166'

        todolistApi.getTasks(todolistId)
            .then((res)=>{
                let tasks = res.data
                setState(tasks);
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        const taskId = ''

        todolistApi.deleteTask(todolistId, taskId)
            .then((res)=>{

                let tasks = res.data
                setState(tasks);
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0e723aeb-ab74-4687-945e-7869af128f3b'
        const title = '11111111111111111'

        todolistApi.createTasks(todolistId, title)
            .then((res)=>{
                let tasks = res.data //????
                setState(tasks);
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        const taskId = ''

        todolistApi.updateTasks(todolistId, taskId)
            .then((res)=>{
                let tasks = res.data
                setState(tasks);
            })
    }, []);

    return <div> {JSON.stringify(state)}</div>
}