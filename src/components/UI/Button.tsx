import { cn } from '../../utils/cn';
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority';

interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children?: React.ReactNode;
}

const buttonVariants = cva(
  'w-full grid place-items-center font-semibold capitalize leading-tight duration-300 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-2 border-brand bg-transparent text-brand transition-all duration-300 hover:bg-brand hover:text-white',
        outlined:
          'bg-transparent text-theme-primary hover:border-theme border-2 border-theme',
        outlinedLight:
          'bg-transparent text-theme-white border-2 border-white',
        normal:
        'bg-brand text-white disabled:bg-gray-400 disabled:cursor-default'
      },
      size: {
        default: 'px-6 pt-3 pb-3 text-[1.3rem] lg:py-5 lg:text-[1.65rem]',
        md: 'px-5 py-3 text-base sm:px-6 sm:py-3.5 sm:text-[1.0625rem] lg:py-4 lg:text-lg',
        sm: 'px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base lg:py-3 lg:text-base',
      },
      rounded: {
        default: 'rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
);


const Button = ({  variant,
  size,
  rounded,
  className,
  children,
  ...props} : IButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button