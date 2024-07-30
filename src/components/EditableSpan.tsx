import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string,
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState(title);

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setItemTitle(event.currentTarget.value)
	}
    
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(itemTitle)
    }

    return (
        <>
        {editMode ? (
            <input value={itemTitle} autoFocus onBlur={offEditMode} onChange={changeItemTitleHandler}/>
        ):(
            <span onDoubleClick={onEditMode}>{title}</span>
        )}
        </>
    );
};

