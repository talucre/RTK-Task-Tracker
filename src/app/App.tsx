import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/index.css'
import { TaskTracker } from '@/features/task-tracker'

export const App = () => {
    return (
        <Provider store={store}>
            <main className="w-full max-w-208 mx-auto px-2 md:px-4">
                <TaskTracker />
            </main>
        </Provider>
    )
}
