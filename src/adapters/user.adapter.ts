import {User} from "../models/user.model";

export const userAdapter = (user: any): User => ({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.is_admin
})