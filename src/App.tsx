import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = "all"| "active"| "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
type TaskType = {
    [key: string]: Array<TasksType>
}

function App() {

    const todolistID_1 =  v1()
    const todolistID_2 =  v1()

    const [todoListsData, setTodoListsData] = useState<Array<TodoListType>>([
            {id: todolistID_1, title: "What to learn", filter: 'all'},
            {id: todolistID_2, title: "What to buy", filter: 'all'},
        ])
    const [tasksData, setTaskData] = useState<TaskType>({
        [todolistID_1]:[
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID_2]:[
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
        ],
    })
    const RemoveTask = (taskId: string, todolistID: string) => {
        let todoListTasks = tasksData[todolistID]
        tasksData[todolistID] = todoListTasks.filter(t => t.id !==taskId);
        setTaskData({...tasksData});
    }
    const AddTask = (title: string,todolistID: string ) => {
        let newTask = {id: v1(), title: title, isDone: false}
        tasksData[todolistID] = [newTask, ...tasksData[todolistID]]
        setTaskData({...tasksData});
    }
    const SetFilterValue = (value: FilterValueType, todolistID: string ) => {
        let todoList = todoListsData.find(tl => tl.id === todolistID );
        if (todoList) {
            todoList.filter = value
            setTodoListsData([...todoListsData]);
        }
    }
    const ChangeStatus = (taskId: string, isDoneValue: boolean,todolistID: string ) => {
        let todoListTasks = tasksData[todolistID]
        let changedValue = todoListTasks.find(t => t.id === taskId);
        if (changedValue) {
            changedValue.isDone = isDoneValue;
            setTaskData({...tasksData});
        }
    }
    const RemoveTodolist = (todolistID: string) => {
        setTodoListsData(todoListsData.filter(tl =>tl.id !==todolistID));
    }
    const AddTodolist = (title: string) => {
        let newTodolistID = v1()
        let newTodolist: TodoListType = {id: newTodolistID, title: title, filter: 'all'}
        setTodoListsData([newTodolist,...todoListsData])
        setTaskData({...tasksData, [newTodolistID]:[]})
    }

    return (
        <div className="App">
            <AddItemForm addItem={AddTodolist}/>
            {
                todoListsData.map(tl => {
                    let TasksForTodolist = tasksData[tl.id];
                    if (tl.filter === "active") {
                        TasksForTodolist = TasksForTodolist.filter(t => t.isDone !== true);
                    }
                    if (tl.filter === "completed") {
                        TasksForTodolist = TasksForTodolist.filter(t => t.isDone !== false);
                    }
                    return (

                        <Todolist
                            key={tl.id}
                            title={tl.title}
                            todolistID={tl.id}
                            tasks={TasksForTodolist}
                            removeTask={RemoveTask}
                            setFilterValue={SetFilterValue}
                            addTask={AddTask}
                            changeStatus={ChangeStatus}
                            filter={tl.filter}
                            removeTodolist={RemoveTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
