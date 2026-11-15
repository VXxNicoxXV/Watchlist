import { useState, type FormEvent } from "react"
import type { Kind, NewShow } from "../data/watchlist"
import { cn } from "../utils/cn"
import { hasErrors, validateShow, type FormErrors, type FormValues } from "../utils/validateShow"
import { Input } from "./Input"

type AddShowFormProps = {
    existingTitles: string[]
    onAdd: (show: NewShow) => void
}

type FormState = {
    values: FormValues
    errors: FormErrors
    submitted: boolean
}

const kinds: Kind[] = ["film", "serie"]

const emptyForm: FormState = {
    values: { title: "", year: "", kind: "film" },
    errors: { title: [], year: [] },
    submitted: false,
}

export function AddShowForm({ existingTitles, onAdd }: AddShowFormProps) {
    const [form, setForm] = useState<FormState>(emptyForm)

    function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
        setForm(prev => {
            const values = { ...prev.values, [field]: value }
            const errors = prev.submitted ? validateShow(values, existingTitles) : prev.errors
            return { ...prev, values, errors }
        })
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const errors = validateShow(form.values, existingTitles)
        if (hasErrors(errors)) {
            setForm(prev => ({ ...prev, errors, submitted: true }))
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

            <Input
                placeholder="Titolo"
                value={form.values.title}
                onChange={e => updateField("title", e.target.value)}
                errors={form.errors.title}
            />

            <Input
                placeholder="Anno"
                type="number"
                value={form.values.year}
                onChange={e => updateField("year", e.target.value)}
                errors={form.errors.year}
            />

            <div className="flex gap-4">
                {kinds.map(kind => (
                    <button
                        type="button"
                        key={kind}
                        onClick={() => updateField("kind", kind)}
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