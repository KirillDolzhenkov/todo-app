import axios from "axios";

export const TodolistApi = {
    getTodos: () => {
        let pr = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {
            withCredentials: true
        })
        return pr
    },
    createTodo: (title: string) => {
        let pr = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title},
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
                }
            })
        return pr
    },
    deleteTodo: (todoId: string) => {
        let pr = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, {
            withCredentials: true,
            headers: {
                'API-KEY': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
            }
        })
        return pr
    },
    updateTodo: (todoId: string, title: string) => {
        let pr = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,{title},
            {
                withCredentials: true,
                headers: {
                    'API-KEY': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
                }
            })
        return pr
    }
}