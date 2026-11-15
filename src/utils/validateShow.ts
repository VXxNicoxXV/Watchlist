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

export function validateShow(values: FormValues): FormErrors {
    const title: string[] = []
    const year: string[] = []

    if (values.title.trim() === "") {
        title.push("Il titolo è obbligatorio")
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