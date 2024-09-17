import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import { TaskComponent, TaskPropsType } from '../TaskComponent';
import { useState } from 'react';




// More on how to set up stories at: 
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskComponent> = {
    title: 'TODOLISTS/TaskComponent',
    component: TaskComponent,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof TaskComponent>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: true},
    },
};

//---------------------------------
const ToggleTask = () => {
    const[task, setTask] = useState({id: '12wsdewfijdei2343', title: 'CSS', isDone: true})
    
    function changeTaskStatus(id: string, isDone: boolean) {
        setTask({...task, isDone: isDone})
    }

    function changeTaskTitle(id: string, newTitle: string) {
        setTask({...task, title: newTitle})
    }

    return <TaskComponent changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={action('removeTask')} task={task} todolistId='12wsdewfijdei2343'/>
}

export const ToggleTaskStory =  {
    render: (args: TaskPropsType) => <ToggleTask />
}