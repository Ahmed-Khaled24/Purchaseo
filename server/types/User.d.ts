import { Product } from "./Product"

export type UserUpdate = {
    name?: string,
    email?: string,
    password?: string
}


export interface User {
    id: number,
    name: string,
    email: string,
    password: string
    socialId?: string,
    socialType?: string,
    createdAt: Date,
    updatedAt: Date

}

export interface Buyer extends User {
    cart: Cart
}

export interface Seller extends User {
    products: Product[]
}