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
    },

    //Tasks:
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<CommonResponseType>(`/todo-lists/${todolistId}/tasks`, {title},);
    },
    updateTasks(todolistId: string, taskId: string) {
        return instance.put<CommonResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`);
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

type GetTaskType = {
    error: string | null
    items: Array<TaskType>
    totalCount: number
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

