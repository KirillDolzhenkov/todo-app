import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': '2f53ebc7-6e0c-44af-b6eb-a755cbe3639f'
    }
})

export const todolistApi =  {

    getTodos() {
        return instance.get('todo-lists');
    },
    createTodo(title: string) {
        return instance.post('todo-lists',{title});
    },
    deleteTodo(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`,);
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`,{title},);
    }
}