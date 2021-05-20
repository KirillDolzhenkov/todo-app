import React, {useCallback, useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {addTodolistAC, removeTodolistAC, todolistsReducer, changeTodolistTitleAC, changeTodolistFilterAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

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
    console.log('App is calling')

    const dispatch = useDispatch();

    const todoListsData = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    const tasksData = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);



    const RemoveTask = useCallback((taskId: string, todolistID: string) => {
        const action = removeTaskAC(taskId, todolistID);
        dispatch(action);
    }, []);

    const AddTask = useCallback((title: string,todolistID: string ) => {
        const action = addTaskAC(title, todolistID);
        dispatch(action);
    }, []);

    const SetFilterValue = useCallback((filter: FilterValueType, id: string) => {
        const action = changeTodolistFilterAC(filter, id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback((editTitle: string, id: string ) => {
        const action = changeTodolistTitleAC(editTitle, id);
        dispatch(action);
    }, []);

    const ChangeStatus = useCallback((taskId: string, isDoneValue: boolean,todolistID: string ) => {
        const action = changeTaskStatusAC(taskId,isDoneValue,todolistID);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback((taskId: string, editTitle: string,todolistId: string ) => {
        const action = changeTaskTitleAC(taskId,editTitle,todolistId);
        dispatch(action);
    }, []);

    const RemoveTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID);
        dispatch(action);
    }, []);

    const AddTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, []);

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


                            /*function getTasksForTodolist(todoList: TodoListType) {
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
                            }*/
                            /*const tasksFilter= getTasksForTodolist(tl)*/

                            const allTodolistTasks =  tasksData[tl.id]; // need rename it
                            const tasksFilter = allTodolistTasks;

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={2} style={{padding: "10px"}}>
                                        <Todolist
                                            title={tl.title}
                                            todolistID={tl.id}
                                            /*tasks={tasksFilter}*/
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
