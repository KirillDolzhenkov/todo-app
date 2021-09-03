import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

//task type:
type TaskPropsType = {
    t: TaskType
    todolistID: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

//task component:
const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const onClickHandler = () => props.removeTask(props.t.id, props.todolistID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.t.id, newIsDoneValue, props.todolistID);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.t.id, newValue, props.todolistID);
    }, [props.changeTaskTitle, props.t.id, props.todolistID]);

    return <div key={props.t.id} className={props.t.isDone ? "is-done" : ""}>
        <Checkbox
            checked={props.t.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.t.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
});

export {
    Task
}