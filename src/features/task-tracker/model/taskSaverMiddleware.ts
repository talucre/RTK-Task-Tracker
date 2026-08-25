import { createListenerMiddleware } from '@reduxjs/toolkit'

export const taskSaverMiddleware = createListenerMiddleware()

taskSaverMiddleware.startListening({
    predicate: action => action.type.startsWith('tasks/'),
    effect: (_, listenerApi) => {
        const state = listenerApi.getState() as any
        localStorage.setItem('saved-tasks', JSON.stringify(state.tasks.tasks))
    },
})
