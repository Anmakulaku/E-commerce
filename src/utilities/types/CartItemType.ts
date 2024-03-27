import { Product } from "./ProductType"

export type CartItem = Product & {
    id: number
    quantity: number
    size?: string
    name?: string
    price?: number
}