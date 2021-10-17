import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
    }
})

export const todolistApi = {

    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists');
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title});
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`,);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title},);
    }
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: {
        item: T
    }
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}