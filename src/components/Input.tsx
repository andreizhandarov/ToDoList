import React, { ChangeEvent, KeyboardEvent } from "react";

type InputPropsType = {
  taskTitle: string,
  setTastTitle: (taskTitle: string) => void,
  callBack: () => void
};

export const Input = ({taskTitle, setTastTitle,callBack}: InputPropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTastTitle(e.currentTarget.value);
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      callBack();
    }
  };

  return (
    <input value={taskTitle} onChange={onChangeHandler} onKeyUp={onKeyUpHandler} />
  );
};
