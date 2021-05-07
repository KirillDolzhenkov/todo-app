import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {addTodolistAC, removeTodolistAC, todolistsReducer, changeTodolistTitleAC, changeTodolistFilterAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValueType = "all"| "active"| "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {

    const todolistID_1 =  v1();
    const todolistID_2 =  v1();

    const [todoListsData, dispatchToTodoLists] = useReducer(todolistsReducer,[
            {id: todolistID_1, title: "What to learn", filter: 'all'},
            {id: todolistID_2, title: "What to buy", filter: 'all'},
        ])
    const [tasksData, dispatchToTasks] = useReducer(tasksReducer,{
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
    });
    const RemoveTask = (taskId: string, todolistID: string) => {
        const action = removeTaskAC(taskId, todolistID);
        dispatchToTasks(action);
        //
        /*let todoListTasks = tasksData[todolistID]
        tasksData[todolistID] = todoListTasks.filter(t => t.id !==taskId);
        setTaskData({...tasksData});*/
    };
    const AddTask = (title: string,todolistID: string ) => {
        const action = addTaskAC(title, todolistID);
        dispatchToTasks(action);
        //
        /*let newTask = {id: v1(), title: title, isDone: false}
        tasksData[todolistID] = [newTask, ...tasksData[todolistID]]
        setTaskData({...tasksData});*/
    }
    const SetFilterValue = (filter: FilterValueType, id: string) => {
        const action = changeTodolistFilterAC(filter, id);
        dispatchToTodoLists(action);
        //
        /*let todoList = todoListsData.find(tl => tl.id === todolistID );
        if (todoList) {
            todoList.filter = value
            setTodoListsData([...todoListsData]);
        }*/
    };
    const changeTodolistTitle = (editTitle: string, todolistID: string ) => {
        const action = changeTodolistTitleAC(editTitle, todolistID);
        dispatchToTodoLists(action);
        //
        /*let todoList = todoListsData.find(tl => tl.id === todolistID );
        if (todoList) {
            todoList.title = editTitle
            setTodoListsData([...todoListsData]);
        }*/
    };
    const ChangeStatus = (taskId: string, isDoneValue: boolean,todolistID: string ) => {
        const action = changeTaskStatusAC(taskId,isDoneValue,todolistID);
        dispatchToTasks(action);
        //
        /*let todoListTasks = tasksData[todolistID]
        let changedValue = todoListTasks.find(t => t.id === taskId);
        if (changedValue) {
            changedValue.isDone = isDoneValue;
            setTaskData({...tasksData});
        }*/
    };
    const changeTaskTitle = (taskId: string, editTitle: string,todolistId: string ) => {
        const action = changeTaskTitleAC(taskId,editTitle,todolistId);
        dispatchToTasks(action);
        //
        /*let todoListTasks = tasksData[todolistID]
        let changedValue = todoListTasks.find(t => t.id === taskId);
        if (changedValue) {
            changedValue.title = editTitle;
            setTaskData({...tasksData});
        }*/
    };
    const RemoveTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID);
        dispatchToTasks(action);
        dispatchToTodoLists(action);

        //
        /*setTodoListsData(todoListsData.filter(tl =>tl.id !==todolistID));*/
    }
    const AddTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTasks(action);
        dispatchToTodoLists(action);
        //
       /*let newTodolistID = v1()
        let newTodolist: TodoListType = {id: newTodolistID, title: title, filter: 'all'}
        setTodoListsData([newTodolist,...todoListsData])
        setTaskData({...tasksData, [newTodolistID]:[]})*/
    };

    return (

        <div className="App">

            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={AddTodolist}/>
                </Grid>

                <Grid container spacing={3} >
                    {
                        todoListsData.map(tl => {
                            /*let TasksForTodolist = tasksData[tl.id];
                            if (tl.filter === "active") {
                                TasksForTodolist = TasksForTodolist.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                TasksForTodolist = TasksForTodolist.filter(t => t.isDone);
                            }*/
                            function getTasksForTodolist(todoList: TodoListType) {
                                switch (tl.filter) {
                                    case "active": {
                                        return tasksData[tl.id].filter(t => !t.isDone);
                                    }
                                    case "completed": {
                                        return tasksData[tl.id].filter(t => t.isDone);
                                    }
                                    default:
                                        return tasksData[tl.id];
                                }
                            }
                            const tasksFilter= getTasksForTodolist(tl)
                            return (


                                <Grid item key={tl.id}>
                                    <Paper elevation={2} style={{padding: "10px"}}>
                                        <Todolist
                                            title={tl.title}
                                            todolistID={tl.id}
                                            tasks={tasksFilter}
                                            removeTask={RemoveTask}
                                            setFilterValue={SetFilterValue}
                                            addTask={AddTask}
                                            changeStatus={ChangeStatus}
                                            filter={tl.filter}
                                            removeTodolist={RemoveTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default AppWithReducers;
