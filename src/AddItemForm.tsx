import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    let [inputValue, setInputValue] = useState<string>('');
    let [error, setError] = useState<null | string>(null)

    let addItem = () => {
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
            <input value={inputValue}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>Title is required</div>}
        </div>
    )
}

