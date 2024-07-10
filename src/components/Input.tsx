import React, { ChangeEvent, KeyboardEvent } from "react";

type InputPropsType = {
  taskTitle: string,
  onChange?: () => void
  onKeyUp?: () => void
};

export const Input = ({taskTitle, onChange, onKeyUp}: InputPropsType) => {
  return (
    <input value={taskTitle} onChange={onChange} onKeyUp={onKeyUp}/>
  );
};

