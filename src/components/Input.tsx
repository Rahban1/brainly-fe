import type React from "react"
import { forwardRef, RefObject } from "react"
import { cn } from "../lib/utils"  // Updated import path

type InputType = 'text' | 'password' | 'email' | 'select';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>, 'type'> {
  label?: string
  error?: string
  reference?: RefObject<HTMLInputElement | HTMLSelectElement>
  selectOptions?: Array<{ value: string; label: string }>
  type?: InputType
}

export const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps>(
  ({ className, label, error, type = "text", reference, selectOptions, ...props }, _ref) => {
    const id = props.id || props.name

    if (type === 'select' && selectOptions) {
      return (
        <div className="w-full">
          {label && (
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
              {label}
            </label>
          )}
          <div className="relative">
            <select
              className={cn(
                "w-full px-4 py-2 rounded-md transition-colors duration-200 ease-in-out",
                "text-white bg-gray-800",
                "border border-gray-600",
                "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                error && "border-red-500 focus:ring-red-500",
                className
              )}
              ref={reference as RefObject<HTMLSelectElement>}
              {...props}
            >
              <option value="">Select type</option>
              {selectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      )
    }

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "w-full px-4 py-2 mb-2 rounded-md transition-colors duration-200 ease-in-out",
              "text-white bg-gray-800",
              "border border-gray-600",
              "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              "placeholder-gray-400",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            ref={reference as RefObject<HTMLInputElement>}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"

