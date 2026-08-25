import { configureStore } from '@reduxjs/toolkit'
import { taskReducer, taskSaverMiddleware } from '@/features/task-tracker'

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(taskSaverMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
