import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentProps<'button'>

export const Button = ({ children, className, ...rest }: Props) => {
    return (
        <button
            {...rest}
            className={twMerge(
                'text-white bg-black px-4 py-2 text-xl rounded-xl cursor-pointer hover:bg-gray-900 active:bg-gray-800 transition-all duration-100 ease-linear',
                className,
            )}
        >
            {children}
        </button>
    )
}
