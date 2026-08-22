import { useDispatch } from 'react-redux'
import { createTask } from './features/task-tracker/taskTrackerSlice'

export const App = () => {
    const dispatch = useDispatch()

    const testCreate = () => {
        dispatch(createTask({ title: 'qwe' }))
    }

    return (
        <div>
            <span>app works!</span>
            <button onClick={testCreate}>create</button>
        </div>
    )
}
