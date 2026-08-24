import { CreateTaskForm } from './CreateTaskForm'
import { TaskList } from './TaskList'

export const TaskTracker = () => {
    return (
        <div className="border-2 rounded-2xl px-4 sm:px-8 md:px-16 py-8 my-8 min-h-104 flex gap-4 flex-col">
            <h3 className="text-2xl">Task Tracker</h3>
            <CreateTaskForm />
            <TaskList />
        </div>
    )
}
