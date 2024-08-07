import {Meta, StoryObj} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import {v1} from "uuid";
import Task from "../common/components/TodoList/IterableTodo/Task/Task";
import {TaskStatuses} from "../common/components/enums/enums";

const meta:Meta<typeof Task>={
    title: "Task",
    component:Task,
    tags:['autodocs'],
    argTypes:{
        task:{
           description:"Obj task",
        },
        removeTask:{
            description:"This function delet task",
        },
        updateTasksHandler:{
            description:"This function update task",

        },
        updateCheckHandler: {
            description: "This function change task check",
        }

    },
    args:{
        task:{id: v1(), title: "HTML", status:TaskStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",priority:1,description:"Desk",todoListId:"todolistId1",entityStatus:"idle"},
        removeTask:action("Delete task"),
        updateTasksHandler:action("UpdateTask"),
        updateCheckHandler:action("Chenge my checked ")
    }
}


export default meta;


export type Story = StoryObj<typeof Task>

export const TaskStory: Story = {
    args:{
        task:{id: v1(), title: "HTML", status:TaskStatuses.New,addedDate:"",startDate:"",order:1,deadline:"",priority:1,description:"Desk",todoListId:"todolistId1",entityStatus:"idle"},
        removeTask:action("Delete task"),
        updateTasksHandler:action("UpdateTask"),
        updateCheckHandler:action("Chenge my checked ")
    }
};