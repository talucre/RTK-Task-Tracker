import { expect, test, describe } from 'vitest'

import taskReducer, { createTask, removeTask, toggleCompleted } from './slice'
import type { CreateTaskInput } from './types'

describe('taskSlice', () => {
    describe('createTask', () => {
        const state = {
            tasks: [],
        }

        const createInput: CreateTaskInput = {
            title: 'test title',
        }

        const createInput2: CreateTaskInput = {
            title: 'test title2',
        }

        test('Добавление нового таска', () => {
            const result = taskReducer(state, createTask(createInput))
            expect(result.tasks[0].title).toBe('test title')
        })

        test('Генерируемые id уникальны', () => {
            const result = taskReducer(state, createTask(createInput))
            const result2 = taskReducer(result, createTask(createInput2))

            const [task1, task2] = result2.tasks
            expect(task1.id).not.toBe(task2.id)
        })

        test('isCompleted у новых тасков false', () => {
            const result = taskReducer(state, createTask(createInput))
            expect(result.tasks[0].isCompleted).toBe(false)
        })
    })

    describe('toggleCompleted', () => {
        const state = {
            tasks: [
                {
                    id: '1',
                    title: 'test title',
                    isCompleted: false,
                },
                {
                    id: '2',
                    title: 'test title2',
                    isCompleted: true,
                },
            ],
        }

        test('Меняет isCompleted', () => {
            const result = taskReducer(state, toggleCompleted('1'))
            const updatedTask = result.tasks.find(t => t.id === '1')
            expect(updatedTask?.isCompleted).toBe(true)

            const result2 = taskReducer(state, toggleCompleted('2'))
            const updatedTask2 = result2.tasks.find(t => t.id === '2')
            expect(updatedTask2?.isCompleted).toBe(false)
        })

        test('При несуществующем id ничего не делает', () => {
            const result = taskReducer(state, toggleCompleted('qwe'))
            expect(result).not.toBe(state) // не ссылается на тот же стейт
            expect(result).toEqual(state) // но не отличается от него
        })
    })

    describe('removeTask', () => {
        const state = {
            tasks: [
                {
                    id: '1',
                    title: 'test title',
                    isCompleted: false,
                },
                {
                    id: '2',
                    title: 'test title2',
                    isCompleted: true,
                },
            ],
        }

        test('Удаляет таск', () => {
            const result = taskReducer(state, removeTask('1'))
            const deletedTask = result.tasks.find(t => t.id === '1')
            expect(deletedTask).toBeUndefined()

            const result2 = taskReducer(result, removeTask('2'))
            const deletedTask2 = result2.tasks.find(t => t.id === '2')
            expect(deletedTask2).toBeUndefined()

            expect(result2.tasks.length).toBe(0)
        })

        test('При несуществующем id ничего не делает', () => {
            const result = taskReducer(state, removeTask('qwe'))
            expect(result).not.toBe(state) // не ссылается на тот же стейт
            expect(result).toEqual(state) // но не отличается от него
        })
    })
})
