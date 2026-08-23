import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

// Создаём базовый текстовый input, при расширении приложения
// можно добавить и другие типы, сделав универсальный input, который
// будет в зависимости от type возвращать разные компоненты
// с соответствующей логикой
// т.к. приложение маленькое, ограничимся лишь текстовым инпутом
interface Props extends Omit<ComponentProps<'input'>, 'type'> {
    className?: string
    error?: string
    type?: 'text' | 'email' | 'tel'
}

export const InputText = ({
    error,
    className,
    type = 'text',
    ...rest
}: Props) => {
    return (
        <div className="relative inline-block w-full">
            <input
                className={twMerge(
                    'w-full px-4 py-2 border-2 text-xl rounded-xl focus-visible:outline-none hover:border-gray-700 focus:border-black transition-all duration-100 ease-linear',
                    className,
                )}
                type={type}
                {...rest}
            />
            {error && (
                <span className="absolute top-full left-0.5 text-red-600">
                    {error}
                </span>
            )}
        </div>
    )
}
