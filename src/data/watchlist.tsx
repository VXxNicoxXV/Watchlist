export type Kind = "film" | "serie"

export type Show = {
    id: number
    title: string
    year: number
    kind: Kind
}

export type NewShow = Omit<Show, "id">

export const watchlist: Show[] = [
    { id: 1, title: "la casa di carta", year: 2005, kind: 'serie' },
    { id: 2, title: "il padrino", year: 1995, kind: 'film' },
    { id: 3, title: "avengers", year: 2021, kind: 'film' },
    { id: 4, title: "reacher", year: 2022, kind: 'serie' },
    { id: 5, title: "stranger things", year: 2018, kind: 'serie' },
    { id: 6, title: "fantastici 4", year: 2008, kind: 'film' },
]