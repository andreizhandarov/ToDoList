import { TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export type AddItemFormPropsType = {
  addItem: (newTitle: string) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo(
  ({ addItem, disabled = false }: AddItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
      if (itemTitle.trim() !== "") {
        addItem(itemTitle.trim());
        setItemTitle("");
      } else {
        setError("Title is required");
      }
    };

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setItemTitle(event.currentTarget.value);
    };

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
        setError(null);
      }
      if (event.key === "Enter") {
        addItemHandler();
      }
    };

    return (
      <div>
        <TextField
          disabled={disabled}
          label="Enter a title"
          variant="outlined"
          size="small"
          error={!!error}
          helperText={error}
          value={itemTitle}
          onChange={changeItemTitleHandler}
          onKeyUp={addItemOnKeyUpHandler}
        />
        <IconButton
          onClick={addItemHandler}
          color="primary"
          disabled={disabled}
        >
          <AddBoxIcon />
        </IconButton>
      </div>
    );
  },
);
