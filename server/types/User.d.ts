import { Timestamp } from "@redis/time-series/dist/commands"
import { Product } from "./Product"
export interface Timestamps {
    createdAt?: Timestamp,
    updatedAt?: Timestamp
}
export interface User extends Timestamps {
    user_id?: number|string,
    image_url?: string,
    // TODO: in validation check Fname and Lname
    Fname: string,
    Lname: string,
    email: string,
    role: 'Seller' | 'Customer' | 'Admin' | 'Company',
    password: string,
    social_id?: string,
    social_type?: 'google' | 'local',
    user_type?: 'Local' | 'Both' | 'Non-Local',
    birthDate?: Date,
}

export interface Admin extends User {
    admin_id?: number|string
    permission?: "adminstrator"
}