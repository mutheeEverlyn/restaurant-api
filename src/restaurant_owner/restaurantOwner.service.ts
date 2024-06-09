import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableRestaurantOwner} from "../drizzle/schema"


export const  restaurantOwnerService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableOrderMenuItem.findMany({
            limit: limit
        });
    }
    return await db.query.tableRestaurantOwner.findMany();
}

export const getRestaurantOwnerService = async (id: number) => {
    return await db.query.tableRestaurantOwner.findFirst({
        where: eq(tableRestaurantOwner.id, id)
    })
}

export const createRestaurantOwnerService = async ( restaurantOwner:any) => {
    await db.insert(tableRestaurantOwner).values( restaurantOwner)
    return " restaurantOwner created successfully";
}

export const updateRestaurantOwnerService = async (id: number,  restaurantOwner: any) => {
    await db.update(tableRestaurantOwner).set(restaurantOwner).where(eq(tableRestaurantOwner.id, id))
    return "restaurantOwner updated successfully";
}

export const deleteRestaurantOwnerService = async (id: number) => {
    await db.delete(tableRestaurantOwner).where(eq(tableRestaurantOwner.id, id))
    return "restaurantOwner deleted successfully";
}
