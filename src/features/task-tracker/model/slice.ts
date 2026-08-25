import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CreateTaskInput, Task } from './types'
import { nanoid } from '@reduxjs/toolkit'

const loadInitialTaksk = (): Task[] => {
    try {
        const serialized = localStorage.getItem('saved-tasks')
        if (serialized) {
            return JSON.parse(serialized)
        }
    } catch (e) {
        console.error('Ошибка чтения localStorage', e)
    }
    return []
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: loadInitialTaksk(),
    },
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
