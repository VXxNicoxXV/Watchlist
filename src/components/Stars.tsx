import { cn } from "../utils/cn"

type StarsProps = {
    rating: number
    onChange: (rating: number) => void
}

export function Stars({ rating, onChange }: StarsProps) {
    return (
        <div onClick={e => e.stopPropagation()} className="flex">
            {[1, 2, 3, 4, 5].map(value => (
                <button
                    type="button"
                    key={value}
                    aria-label={`Voto ${value}`}
                    onClick={() => onChange(value === rating ? 0 : value)}
                    className={cn("text-xl text-gray-400", {
                        "text-yellow-500": value <= rating,
                    })}
                >★</button>
            ))}
        </div>
    )
}