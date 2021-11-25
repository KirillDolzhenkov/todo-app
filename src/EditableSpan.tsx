import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log('EditableSpan called');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    /*const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }*/
    const changeEditMode = (value: boolean) => {
        setEditMode(value);
        if (value) {
            setTitle(props.value);
        } else {
            props.onChange(title);
        }
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeEditMode(false);
        }
    }

    return editMode
        ? <TextField
            value={title}
            onChange={changeTitle}
            onBlur={()=>changeEditMode(false)}
            onKeyPress={onKeyHandler}
            autoFocus
        />
        : <span onDoubleClick={()=>changeEditMode(true)}>{props.value}</span>
});
