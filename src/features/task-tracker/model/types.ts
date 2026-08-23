import z from 'zod'

export const createTaskSchema = z.object({
    title: z.string().min(1, 'Task title is necessary'),
})

export const taskSchema = createTaskSchema.extend({
    id: z.string(),
    isCompleted: z.boolean(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type Task = z.infer<typeof taskSchema>
