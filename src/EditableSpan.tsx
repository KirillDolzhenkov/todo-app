import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (editTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        if (title) {
            setEditMode(false)
            props.changeTitle(title)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>(setTitle(e.currentTarget.value));
    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.changeTitle(title)
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
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
}
