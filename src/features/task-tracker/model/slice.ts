import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CreateTaskInput, Task } from './types'
import { nanoid } from '@reduxjs/toolkit'

interface TaskState {
    tasks: Task[]
}

const initialState: TaskState = {
    tasks: [
        {
            id: '123',
            title: 'test title 1',
            isCompleted: false,
        },
        {
            id: '321',
            title: 'test title 2',
            isCompleted: true,
        },
    ],
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTask: {
            reducer: (state, action: PayloadAction<Task>) => {
                state.tasks.push(action.payload)
            },
            prepare: (input: CreateTaskInput) => {
                return {
                    payload: {
                        ...input,
                        id: nanoid(),
                        isCompleted: false,
                    },
                }
            },
        },
        toggleCompleted: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(t => t.id === action.payload)
            if (task) {
                task.isCompleted = !task.isCompleted
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            const id = action.payload
            state.tasks = state.tasks.filter(task => task.id !== id)
        },
    },
})

export const { createTask, toggleCompleted, removeTask } = taskSlice.actions
export default taskSlice.reducer
