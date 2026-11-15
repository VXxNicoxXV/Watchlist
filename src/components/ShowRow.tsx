import type { Show } from "../data/watchlist";
import { cn } from "../utils/cn";

type ShowRowProps = {
    show: Show,
    onClick: () => void,
    onToggleSeen: () => void
}

export function ShowRow({ show, onClick, onToggleSeen }: ShowRowProps) {
    return (
        <div onClick={onClick} className="flex justify-between items-center px-4 py-2 border border-gray-400 rounded-lg">
            <div className="flex flex-col">
                <p className={cn("font-bold capitalize", { "line-through opacity-50": show.seen })}>{show.title}</p>
                <p className="opacity-75">{show.year}</p>
            </div>

            <div className="flex items-center gap-4">
                <label onClick={e => e.stopPropagation()} className="flex items-center gap-1 text-sm">
                    <input type="checkbox" checked={show.seen} onChange={onToggleSeen} />
                    Visto
                </label>

                <span className={cn("rounded-full text-center px-3 text-black/90 capitalize", {
                    "bg-yellow-200": show.kind === 'film',
                    "bg-purple-200": show.kind === 'serie',
                })}>{show.kind}</span>
            </div>
        </div>
    );
}