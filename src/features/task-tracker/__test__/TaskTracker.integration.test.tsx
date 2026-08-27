import { createTestStore } from './createTestStore'
import userEvent from '@testing-library/user-event'
import { cleanup, render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { TaskTracker } from '../ui/TaskTracker'
import '@testing-library/jest-dom'

describe('Интеграционный тест TaskTracker', () => {
    let store: ReturnType<typeof createTestStore>

    beforeEach(() => {
        cleanup()

        store = createTestStore()

        vi.stubGlobal('localStorage', {
            setItem: vi.fn(),
            getItem: vi.fn(),
        })
    })

    const setupHelper = () => {
        const user = userEvent.setup()

        render(
            <Provider store={store}>
                <TaskTracker />
            </Provider>,
        )

        const input = screen.getByPlaceholderText(
            'Start writing and press enter to create task',
        )
        const submitButton = screen.getByRole('button', { name: 'Save' })

        return { user, input, submitButton }
    }

    test('Успешное создание и удаление таска', async () => {
        const { user, input, submitButton } = setupHelper()

        // изначально список пустой
        expect(screen.queryByText('Купить молоко')).not.toBeInTheDocument()

        await user.type(input, 'Купить молоко')
        expect(input).toHaveValue('Купить молоко')

        await user.click(submitButton)

        // сбрасывается после ввода
        expect(input).toHaveValue('')

        // добавлися в список
        const newTask = screen.getByText('Купить молоко')
        expect(newTask).toBeInTheDocument()

        // миддлвейр сохранил в localStorage
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'saved-tasks',
            expect.stringContaining('Купить молоко'),
        )

        // удален из списка
        const deleteButton = screen.getByRole('button', { name: 'del' })

        await user.click(deleteButton)
        expect(screen.queryByText('Купить молоко')).not.toBeInTheDocument()
    })

    test('Корректное отображение сообщения об ошибке', async () => {
        const { user, input, submitButton } = setupHelper()

        let errorMessage: HTMLElement | null

        await user.click(submitButton)

        // 1. появляется при попытке создать таск с пустым title
        errorMessage = screen.getByText('Task title is necessary')
        expect(errorMessage).toBeInTheDocument()

        // 2. не считает пустую строку корректным title
        await user.type(input, ' ')
        await user.click(submitButton)
        errorMessage = screen.queryByText('Task title is necessary')
        expect(errorMessage).toBeInTheDocument()

        // 3. исчезает при корректном вводе
        await user.type(input, 'normal title')
        await user.click(submitButton)
        errorMessage = screen.queryByText('Task title is necessary')
        expect(errorMessage).not.toBeInTheDocument()
    })

    test('Успешное создание, изменение и удаление с двумя тасками', async () => {
        const { user, input, submitButton } = setupHelper()

        await user.type(input, 'Таск 1')
        await user.click(submitButton)

        await user.clear(input)

        await user.type(input, 'Таск 2')
        await user.click(submitButton)

        const task1 = screen.getByText('Таск 1')
        const task2 = screen.getByText('Таск 2')

        const taskContainer1 = task1.closest(
            '[data-testid="task-container"',
        ) as HTMLElement

        const taskContainer2 = task2.closest(
            '[data-testid="task-container"',
        ) as HTMLElement

        const subContainer1 =
            within(taskContainer1).getByTestId('task-text-wrapper')

        const subContainer2 =
            within(taskContainer2).getByTestId('task-text-wrapper')

        const checkbox1 = within(subContainer1).getByRole('checkbox')
        const checkbox2 = within(subContainer2).getByRole('checkbox')

        // первый выполнен, второй нет
        await user.click(checkbox1)
        expect(task1).toHaveClass('after:block')
        expect(task2).not.toHaveClass('after:block')

        // оба выполнены
        await user.click(checkbox2)
        expect(task1).toHaveClass('after:block')
        expect(task2).toHaveClass('after:block')

        // первый таск больше не выполнен, второй не изменился
        await user.click(checkbox1)
        expect(task1).not.toHaveClass('after:block')
        expect(task2).toHaveClass('after:block')

        const deleteBtn1 = within(taskContainer1).getByRole('button', {
            name: 'del',
        })
        const deleteBtn2 = within(taskContainer2).getByRole('button', {
            name: 'del',
        })

        // по очереди удаляем
        await user.click(deleteBtn1)
        expect(screen.queryByText('Таск 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Таск 2')).toBeInTheDocument()

        await user.click(deleteBtn2)
        expect(screen.queryByText('Таск 2')).not.toBeInTheDocument()
    })
})
