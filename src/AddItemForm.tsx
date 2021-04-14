import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<null | string>(null)

    const addItem = () => {
        if (inputValue.trim()) {
            props.addItem(inputValue);
            setInputValue('');
        } else {
            setError("Title is required")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>(setInputValue(e.currentTarget.value));
    const onKeyPressHandler = (e: KeyboardEvent) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return (
        <div>
            <TextField
                variant={"outlined"}
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                /*className={error ? "error" : ""}*/ //rudiment
                label={"title"}
                error={!!error}
                helperText={error}
            />
            {/*<input value={inputValue}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />*/}
            {/*<button onClick={addItem}>+</button>*/}
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>Title is required</div>}*/}
        </div>
    )
}

