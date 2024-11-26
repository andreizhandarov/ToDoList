import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { AddItemForm, AddItemFormPropsType } from "../common/components/AddItemForm/AddItemForm"
import React, { ChangeEvent, useState, KeyboardEvent } from "react"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"


const meta: Meta<typeof AddItemForm> = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,
  tags: ["autodocs"],
  argTypes: {
    addItem: {
      description: "Button clicked inside form",
      action: "clicked",
    },
  },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

// export const AddItemFormStory: Story = {
//   args: {
//     addItem: action("Button clicked inside form"),
//   },
// }

const AddItemFormWithError = React.memo(({ addItem }: AddItemFormPropsType) => {
  console.log("AddItemForm is called")
  const [itemTitle, setItemTitle] = useState("")
  const [error, setError] = useState<string | null>("Title is required")

  const addItemHandler = () => {
    if (itemTitle.trim() !== "") {
      addItem(itemTitle.trim())
      setItemTitle("")
    } else {
      setError("Title is required")
    }
  }

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(event.currentTarget.value)
  }

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (event.key === "Enter") {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        label="Enter a title"
        variant="outlined"
        size="small"
        error={!!error}
        helperText={error}
        value={itemTitle}
        onChange={changeItemTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
      />
      <IconButton onClick={addItemHandler} color="primary">
        <AddBoxIcon />
      </IconButton>
    </div>
  )
})

// export const AddItemFormWithErrorStory = () => {
//   return <AddItemFormWithError addItem={action("Button clicked inside form")} />
// }

// export const AddItemFormWithErrorStoryNew =  {
//     render: () => <AddItemFormWithError addItem={action('Button clicked inside form')}/>
// }
