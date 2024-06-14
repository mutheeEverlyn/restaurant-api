import { eq} from "drizzle-orm";
import db from "../drizzle/db";
import {tableUsers, tiUsers,tsUsers} from "../drizzle/schema"


export const usersService = async (limit?: number):Promise<tsUsers[] | null> => {
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
//emailVerified =true
export const emailVerified = async ()  => {
    const verified=await db.select().from(tableUsers).where(eq(tableUsers.email_verified ,true))
    return verified;
}
//users data
export const usersData = async () => {
    return await db.query.tableUsers.findMany({
        columns:{
           name:true,
        },
       with:{
       address:{
            columns:{
               delivery_instructions:true,
               zip_code:true,
               street_address_1:true,
               street_address_2:true,
            }
        },
        comment:{
            columns:{
                comment_text:true,
                created_at:true,
                updated_at:true
            }
        },
        driver:{
            columns:{
                delivering:true,
                online:true 
            }
        },
        orders:{
            columns:{
                 actual_delivery_time:true,
                 comment:true,
                 estimated_delivery_time:true
            }
        }
       }
    });
}
export const createUserService = async (user:any):Promise<string | null>   => {
    await db.insert(tableUsers).values(user)
    return "User created successfully";
}

export const updateUserService = async (id: number, user: any):Promise<string | null>  => {
    await db.update(tableUsers).set(user).where(eq(tableUsers.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number):Promise<string | null>  => {
    await db.delete(tableUsers).where(eq(tableUsers.id, id))
    return "User deleted successfully";
}
