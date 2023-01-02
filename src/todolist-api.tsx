import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
    }
})

export const TodolistApi = {
    getTodos: () => {
        return instance.get<Array<TodoType>>("todo-lists")
    },
    createTodo: (title: string) => {
        return instance.post<"", AxiosResponse<BaseResponseType<{item: TodoType}>>, {title: string}>("todo-lists", {title})
    },
    deleteTodo: (todoId: string) => {
        return instance.delete<BaseResponseType>(`todo-lists/${todoId}`)
    },
    updateTodoTitle: (p: { todoId: string, title: string }) => {
        return instance.put<BaseResponseType>(`todo-lists/${p.todoId}`, {title: p.title})
    }
}

export const TaskApi = {
    getTasks: () => {
        return instance.get("")
    },
    createTodo: (title: string) => {
        return instance.post("", {})
    },
    deleteTodo: (todoId: string) => {
        return instance.delete(``)
    },
    updateTodoTitle: () => {
        return instance.put(``, {})
    }
}

// Types
type BaseResponseType<T = {}> = {
    data: T
    fieldsErrors: []
    resultCode: number
    messages: string[],
}
type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}