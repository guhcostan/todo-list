export interface Todo {
    id: number
    name: string
    permaLink: string
    itens: Item[]
}

export interface Item {
    id: number
    order: string
    item: string
    itens: Item[]
}
