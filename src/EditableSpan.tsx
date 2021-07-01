import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (editTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);
    const [error, setError] = useState<null | string>(null);

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        if (title) {
            setEditMode(false);
            props.changeTitle(title);
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>(setTitle(e.currentTarget.value));
    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (title){
                setEditMode(false);
                props.changeTitle(title);
            } else {
                setError("Title is required");
            }
        }
    }

    return (
        editMode
            ? /*<input
            value={title}
            autoFocus={true}
            onChange={onChangeHandler}
            onBlur={offEditMode}
            />*/
            <TextField
                color={"primary"}
                variant={"standard"}
                value={title}
                autoFocus={true}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={offEditMode}
                error={!!error}
                helperText={error}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
}
