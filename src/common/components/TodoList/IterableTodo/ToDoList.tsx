import React, {useCallback, useState} from 'react';
import MyButton from "../../ButtonAndMenu/MyButton";
import "./ToDoList.style.css"
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {IconButton, Skeleton} from "@mui/material";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {TaskStatuses} from "../../enums/enums";
import Box from "@mui/material/Box";
import AlertDialog from "../../DialogsDelete/DialogDelete";
import {RootStateType, useAppDispatch} from "App/store/store";
import {taskThunk, TaskTypeEntity} from "./Task/TaskSlice";
import {ChoseType, TodoListDomainType} from "./TodoListSlice";
import {Login} from "../../Login/Login";


type ToDoListType = {
    NameToDO: string,
    changeFilter: (value: ChoseType, id: string) => void,
    todoList: TodoListDomainType
    updateTodoLists: (id: string, title: string) => void,
    removeTodoList: (idRemove: string) => void
}


const ToDoList = React.memo(({removeTodoList, NameToDO, changeFilter, todoList, updateTodoLists}: ToDoListType) => {

    const dispatch = useAppDispatch()

    let taskForToDOList = useSelector<RootStateType, Array<TaskTypeEntity>>(state => state.TaskReducer[todoList.id]);

    const isShowTasks = todoList.isShowTasks

    const [dropTaskId, setDropTaskId] = useState("");


    const removeTask = useCallback((id: string) => {
        dispatch(taskThunk.deleteTasks({todoListId: todoList.id, id}));
    }, [dispatch, todoList.id])

    const addTasks = useCallback((title: string) => {

        dispatch(taskThunk.addTasks({todoListId: todoList.id, title}))

    }, [dispatch, todoList.id]);

    const updateCheckHandler = useCallback((id: string, check: number) => {
        dispatch(taskThunk.changeTaskStatusAndTitle({TodoListId: todoList.id, id, domainModel: {status: check}}))
    }, [dispatch, todoList.id])


    const updateTasksHandler = useCallback((id: string, text: string) => {
        dispatch(taskThunk.changeTaskStatusAndTitle({TodoListId: todoList.id, id, domainModel: {title: text}}))
    }, [dispatch, todoList.id]);


    const updateTodoListsHandler = useCallback((title: string) => {
        updateTodoLists(todoList.id, title);
    }, [updateTodoLists, todoList.id])

    const removeTodo = useCallback((idRemove: string) => {
        removeTodoList(idRemove);
    }, [removeTodoList])


    if (todoList.filter === "active") {
        taskForToDOList = taskForToDOList.filter(el => el.status === TaskStatuses.New);
    }
    if (todoList.filter === "completed") {
        taskForToDOList = taskForToDOList.filter(el => el.status === TaskStatuses.Completed);
    }

    const onDragStartHandler = (e:React.DragEvent<HTMLDivElement>,task:TaskTypeEntity) =>{
        e.stopPropagation()
        setDropTaskId(task.id)
    }
    const onDragEndHandler = (e:React.DragEvent<HTMLDivElement>,task:TaskTypeEntity) =>{

    }

    const onDragLeaveHandler = (e:React.DragEvent<HTMLDivElement>) =>{

    }
    const onDragOverHandler = (e:React.DragEvent<HTMLDivElement>,) =>{
        e.stopPropagation()
        e.preventDefault()
    }
    const onDropHandler = (e:React.DragEvent<HTMLDivElement>,task:TaskTypeEntity,todoList:TodoListDomainType) =>{
        e.stopPropagation()
        e.preventDefault()
        dispatch(taskThunk.DragAndDropUpdateTask({todoListId:todoList.id,TaskId:task.id,dragID:dropTaskId}))

    }


    const listItems: Array<JSX.Element> = taskForToDOList?.map(el => {
        return <div key={el.id}
            onDragStart={event => onDragStartHandler(event,el)}
            onDragEnd={event => onDragEndHandler(event,el)}
            onDragLeave={event => onDragLeaveHandler(event)}
            onDragOver={event => onDragOverHandler(event)}
            onDrop={event => onDropHandler(event,el,todoList)}
            draggable={true}
        > {todoList.entityStatus === "loading" ?
            <Skeleton key={el.id}> <Task key={el.id} updateCheckHandler={updateCheckHandler} removeTask={removeTask}
                                         updateTasksHandler={updateTasksHandler} task={el} todoListId={todoList.id}/>
            </Skeleton>
            : <Task key={el.id} updateCheckHandler={updateCheckHandler} removeTask={removeTask}
                    updateTasksHandler={updateTasksHandler} task={el} todoListId={todoList.id}/>}
        </div>
    })


    const onAllClickHandler = useCallback(() => changeFilter('all', todoList.id), [changeFilter, todoList.id]);
    const onActiveClickHandler = useCallback(() => changeFilter('active', todoList.id), [changeFilter, todoList.id]);
    const onCompletedClickHandler = useCallback(() => changeFilter('completed', todoList.id), [changeFilter, todoList.id]);

    const removeAlertDialogCallback1 = ()=>{
        removeTodo(todoList.id)
    }



    return (
        <>
            <div className="toDoList">
                <h3>
                    <div className={"h3-todo"}>
                        <EditableSpan oldTitle={NameToDO} updateTasksCallbackHandler={updateTodoListsHandler}
                                      disabled={todoList.entityStatus}/>
                        <IconButton
                                    disabled={todoList.entityStatus === "loading"}>
                            <AlertDialog removeAlertDialogCallback={removeAlertDialogCallback1}/>

                        </IconButton>

                    </div>
                </h3>
                <AddItemForm  addItem={addTasks} disabled={todoList.entityStatus}/>
                <ul className="ul-box">
                    {
                        !isShowTasks ? <Box sx={{width: 200}}>
                        <Skeleton/>
                        <Skeleton animation="wave"/>
                        <Skeleton animation={false}/>
                    </Box> : listItems.length === 0 ? <li>Нет тасок</li>: listItems
                    }

                </ul>
                <div className={"filterButton"}>
                    <MyButton isActive={todoList.filter === "all"} onClick={onAllClickHandler}>All</MyButton>
                    <MyButton isActive={todoList.filter === "active"} onClick={onActiveClickHandler}>Active</MyButton>
                    <MyButton isActive={todoList.filter === "completed"}
                              onClick={onCompletedClickHandler}>Completed</MyButton>
                </div>
            </div>
        </>
    );
})

export default ToDoList;


