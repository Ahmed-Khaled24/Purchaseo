import { Timestamp } from "@redis/time-series/dist/commands"
import { Product } from "./Product"
export interface Timestamps {
    createdAt?: Timestamp,
    updatedAt?: Timestamp
}

export const permissions: any = {
	Admin: 1,
	Customer: 2,
	Seller: 2,
	Company: 2,
}
export type Role = keyof typeof permissions;

export type social_type = 'google' | 'local'
export type user_type = 'Local' | 'Both' | 'Non-Local'
export interface User extends Timestamps {
    user_id?: number,
    image_url?: string,
    // TODO: in validation check Fname and Lname
    Fname: string,
    Lname: string,
    phone_number?: string,
    email: string,
    role: Role,
    password: string,
    social_id?: string,
    social_type?: social_type,
    user_type?: user_type,
    birthDate?: Date,
}

export interface Admin extends User {
    admin_id?: number|string
    permission?: "adminstrator"
}

