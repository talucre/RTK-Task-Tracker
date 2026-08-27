import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../model/slice'
import { taskSaverMiddleware } from '../model/taskSaverMiddleware'

export const createTestStore = () => {
    return configureStore({
        reducer: {
            tasks: taskReducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(taskSaverMiddleware.middleware),
    })
}
