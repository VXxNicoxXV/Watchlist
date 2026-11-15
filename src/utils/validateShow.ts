import type { Kind } from "../data/watchlist"

export type FormValues = {
    title: string
    year: string
    kind: Kind
}

export type FormErrors = {
    title: string[]
    year: string[]
}

export function validateShow(values: FormValues, existingTitles: string[]): FormErrors {
    const title: string[] = []
    const year: string[] = []

    const newTitle = values.title.trim().toLowerCase()
    if (newTitle === "") {
        title.push("Il titolo è obbligatorio")
    } else {
        if (newTitle.length < 2) {
            title.push("Il titolo deve avere almeno 2 caratteri")
        }
        if (existingTitles.some(existing => existing.trim().toLowerCase() === newTitle)) {
            title.push("Questo titolo è già nella lista")
        }
    }

    const currentYear = new Date().getFullYear()
    const yearNumber = Number(values.year)
    if (values.year === "" || yearNumber < 1900 || yearNumber > currentYear) {
        year.push(`L'anno deve essere compreso tra il 1900 e il ${currentYear}`)
    }

    return { title, year }
}

export function hasErrors(errors: FormErrors): boolean {
    return Object.values(errors).some(list => list.length > 0)
}