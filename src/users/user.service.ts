import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableUsers} from "../drizzle/schema"


export const usersService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableUsers.findMany({
            limit: limit
        });
    }
    return await db.query.tableUsers.findMany();
}

export const getUserService = async (id: number) => {
    return await db.query.tableUsers.findFirst({
        where: eq(tableUsers.id, id)
    })
}

export const createUserService = async (user:any) => {
    await db.insert(tableUsers).values(user)
    return "User created successfully";
}

export const updateUserService = async (id: number, user: any) => {
    await db.update(tableUsers).set(user).where(eq(tableUsers.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(tableUsers).where(eq(tableUsers.id, id))
    return "User deleted successfully";
}
