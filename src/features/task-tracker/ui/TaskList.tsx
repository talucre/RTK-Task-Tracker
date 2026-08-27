import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { deleteIcon } from '@/shared/assets'
import { removeTask, selectTasksSorted, toggleCompleted } from '../model/slice'

export const TaskList = () => {
    const tasks = useAppSelector(selectTasksSorted)
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col gap-2">
            {tasks.map(t => (
                <div
                    key={t.id}
                    className="text-xl border-b-2 border-gray-300 pb-1 flex items-center"
                    data-testid="task-container"
                >
                    <div
                        className="flex-1 flex items-center"
                        data-testid="task-text-wrapper"
                    >
                        <input
                            type="checkbox"
                            id={t.id}
                            checked={t.isCompleted}
                            onChange={() => dispatch(toggleCompleted(t.id))}
                            className="w-4 h-4 mr-2 appearance-none rounded border cursor-pointer border-gray-300 bg-white checked:border-gray-500 checked:bg-gray-500"
                        />
                        <span
                            className={`
                                relative flex-1
                                ${
                                    t.isCompleted
                                        ? 'text-gray-400 after:absolute after:content-[""] after:w-full after:h-0.5 after:bg-gray-400 after:block after:top-4'
                                        : 'text-black'
                                }`}
                        >
                            {t.title}
                        </span>
                    </div>
                    <button
                        onClick={() => dispatch(removeTask(t.id))}
                        className="w-5 h-5 ml-1 cursor-pointer flex items-center justify-center"
                    >
                        <img src={deleteIcon} alt="del" />
                    </button>
                </div>
            ))}
        </div>
    )
}
