import React, { ChangeEvent, KeyboardEvent } from "react";

type InputPropsType = {
  className?: string
  value?: string,
  type?: string,
  checked?: boolean,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void
};

export const Input = ({value, className, type, checked, onChange, onKeyUp}: InputPropsType) => {
  return (
    <input value={value} className={className} type={type} checked={checked} onChange={onChange} onKeyUp={onKeyUp}/>
  );
};

