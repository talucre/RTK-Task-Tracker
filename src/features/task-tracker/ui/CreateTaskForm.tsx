import { useAppDispatch } from '@/app/store/hooks'
import { Button, InputText } from '@/shared/ui'
import { useForm } from 'react-hook-form'
import { type CreateTaskInput, createTaskSchema } from '../model/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTask } from '../model/slice'

export const CreateTaskForm = () => {
    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateTaskInput>({
        resolver: zodResolver(createTaskSchema),
    })

    const onSubmit = (task: CreateTaskInput) => {
        dispatch(createTask(task))
        reset()
    }

    const onError = (err: unknown) => {
        console.error(err)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="relative flex w-full gap-1 flex-col sm:flex-row"
        >
            <InputText
                {...register('title')}
                placeholder="Start writing and press enter to create task"
                error={errors?.title?.message}
            />
            <Button>Save</Button>
        </form>
    )
}
