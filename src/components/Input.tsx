import type { ComponentProps } from "react"
import { cn } from "../utils/cn"

type InputProps = ComponentProps<"input"> & {
    errors: string[]
}

export function Input({ errors, className, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            <input
                {...props}
                className={cn("bg-gray-200 p-2 rounded-lg border-2 border-transparent", {
                    "border-red-500": errors.length > 0,
                }, className)}
            />
            {errors.map(error => (
                <p key={error} className="text-sm text-red-600">{error}</p>
            ))}
        </div>
    )
}