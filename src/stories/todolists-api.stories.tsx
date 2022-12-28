import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        let promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists",{
            withCredentials: true
        })
        promise.then((response) => {
            setState(response.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let title = "Test"
    useEffect(() => {
         let promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title},
             {
                 withCredentials: true,
                 headers: {
                     'API-KEY': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
                 }
             }
         )
         promise.then((response)=>{
             setState(response.data)
         })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = "0e723aeb-ab74-4687-945e-7869af128f3b"
        let promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, {
            withCredentials: true,
            headers: {
                'API-KEY': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
            }
        })
        promise.then((response)=> {
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
        let promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,{title},
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
                }
            })
        promise.then((response)=> {
            setState(response.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
