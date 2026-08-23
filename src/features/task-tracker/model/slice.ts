import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CreateTaskInput, Task } from './types'
import { nanoid } from '@reduxjs/toolkit'

interface TaskState {
    tasks: Task[]
}

const initialState: TaskState = {
    tasks: [],
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
    },
})

export const { createTask } = taskSlice.actions
export default taskSlice.reducer
