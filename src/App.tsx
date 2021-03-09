import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValueType = "all"| "active"| "completed"

function App() {

    let [filter, setFilter] = useState<FilterValueType>("all")

    let [tasksData, setTaskData] = useState<Array<TasksType>>([
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    const RemoveTask = (taskId: string) => {
        let removedTask = tasksData.filter(t => t.id !==taskId);
        setTaskData(removedTask);
    }

    const AddTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTaskData([newTask,...tasksData]);
    }

    const SetFilterValue = (value: FilterValueType) => {
        setFilter(value);
    }

    const ChangeStatus = (taskId: string, isDoneValue: boolean) => {
        let changedValue = tasksData.find(t => t.id === taskId);
        if (changedValue) {
            changedValue.isDone = isDoneValue;
            setTaskData([...tasksData]);
        }
    }
    let TasksForTodolist = tasksData;
    if (filter === "active") {
        TasksForTodolist = tasksData.filter(t => t.isDone !== true);
    }
    if (filter === "completed") {
        TasksForTodolist = tasksData.filter(t => t.isDone !== false);
    }

    return (
        <div className="App">
          <Todolist
              tasks={TasksForTodolist}
              removeTask={RemoveTask}
              setFilterValue={SetFilterValue}
              addTask={AddTask}
              changeStatus={ChangeStatus}
              filter={filter}
          />
        </div>
    );
}

export default App;
