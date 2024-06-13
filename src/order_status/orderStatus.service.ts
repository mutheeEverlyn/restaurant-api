import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableOrderStatus, tsOrderStatus,tiOrderStatus} from "../drizzle/schema"


export const orderStatusService = async (limit?: number):Promise<tsOrderStatus[]  | null> => {
    if (limit) {
        return await db.query.tableOrderStatus.findMany({
            limit: limit
        });
    }
    return await db.query.tableOrderStatus.findMany();
}

export const getOrderStatusService = async (id: number) => {
    return await db.query.tableOrderStatus.findFirst({
        where: eq(tableOrderStatus.id, id)
    })
}

export const createOrderStatusService = async (orderStatus:any):Promise<string | null>  => {
    await db.insert(tableOrderStatus).values(orderStatus)
    return "orderStatus created successfully";
}

export const updateOrderStatusService = async (id: number, orderStatus: any):Promise<string | null>   => {
    await db.update(tableOrderStatus).set(orderStatus).where(eq(tableOrderStatus.id, id))
    return "orderStatus updated successfully";
}

export const deleteOrderStatusService = async (id: number):Promise<string | null>  => {
    await db.delete(tableOrderStatus).where(eq(tableOrderStatus.id, id))
    return "orderStatus deleted successfully";
}
