import { expect, test, describe } from 'vitest'

import taskReducer, { createTask } from './slice'
import type { CreateTaskInput } from './types'

const state = {
    tasks: [],
}

describe('taskSlice', () => {
    describe('createTask', () => {
        test('Добавление нового таска', () => {
            const createInput: CreateTaskInput = {
                title: 'test title',
            }

            const result = taskReducer(state, createTask(createInput))
            expect(result.tasks[0].title).toBe('test title')
        })

        test('Генерируемые id уникальны', () => {
            const createInput1: CreateTaskInput = {
                title: 'test title1',
            }

            const createInput2: CreateTaskInput = {
                title: 'test title2',
            }

            const result1 = taskReducer(state, createTask(createInput1))
            const result2 = taskReducer(result1, createTask(createInput2))

            const [task1, task2] = result2.tasks
            expect(task1.id).not.toBe(task2.id)
        })

        test('isCompleted у новых тасков false', () => {
            const createInput: CreateTaskInput = {
                title: 'test title',
            }

            const result = taskReducer(state, createTask(createInput))
            expect(result.tasks[0].isCompleted).toBe(false)
        })
    })
})
