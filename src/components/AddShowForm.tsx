import { useState, type FormEvent } from "react"
import type { Kind, NewShow } from "../data/watchlist"
import { cn } from "../utils/cn"
import { hasErrors, validateShow, type FormErrors, type FormValues } from "../utils/validateShow"

type AddShowFormProps = {
    existingTitles: string[]
    onAdd: (show: NewShow) => void
}

type FormState = {
    values: FormValues
    errors: FormErrors
}

const kinds: Kind[] = ["film", "serie"]

const emptyForm: FormState = {
    values: { title: "", year: "", kind: "film" },
    errors: { title: [], year: [] },
}

export function AddShowForm({ existingTitles, onAdd }: AddShowFormProps) {
    const [form, setForm] = useState<FormState>(emptyForm)

    function handleTitleChange(title: string) {
        setForm(prev => ({ ...prev, values: { ...prev.values, title } }))
    }

    function handleYearChange(year: string) {
        setForm(prev => ({ ...prev, values: { ...prev.values, year } }))
    }

    function handleKindChange(kind: Kind) {
        setForm(prev => ({ ...prev, values: { ...prev.values, kind } }))
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const errors = validateShow(form.values, existingTitles)
        if (hasErrors(errors)) {
            setForm(prev => ({ ...prev, errors }))
            return
        }

        onAdd({
            title: form.values.title.trim(),
            year: Number(form.values.year),
            kind: form.values.kind,
        })
        setForm(emptyForm)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1 className="font-bold text-center text-xl">Aggiungi Titolo</h1>

            <input
                placeholder="Titolo"
                value={form.values.title}
                onChange={e => handleTitleChange(e.target.value)}
                className="bg-gray-200 p-2 rounded-lg"
            />
            {form.errors.title.map(error => (
                <p key={error} className="text-sm text-red-600">{error}</p>
            ))}

            <input
                placeholder="Anno"
                type="number"
                value={form.values.year}
                onChange={e => handleYearChange(e.target.value)}
                className="bg-gray-200 p-2 rounded-lg"
            />
            {form.errors.year.map(error => (
                <p key={error} className="text-sm text-red-600">{error}</p>
            ))}

            <div className="flex gap-4">
                {kinds.map(kind => (
                    <button
                        type="button"
                        key={kind}
                        onClick={() => handleKindChange(kind)}
                        className={cn("px-4 py-2 bg-gray-400 rounded-full", {
                            "bg-blue-400": form.values.kind === kind,
                        })}
                    >{kind}</button>
                ))}
            </div>

            <button type="submit" className="rounded-full px-4 py-2 bg-blue-400">Aggiungi</button>
        </form>
    )
}