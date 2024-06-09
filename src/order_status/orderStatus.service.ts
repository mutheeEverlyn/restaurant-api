import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableOrderStatus} from "../drizzle/schema"


export const orderStatusService = async (limit?: number) => {
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

export const createOrderStatusService = async (orderStatus:any) => {
    await db.insert(tableOrderStatus).values(orderStatus)
    return "orderStatus created successfully";
}

export const updateOrderStatusService = async (id: number, orderStatus: any) => {
    await db.update(tableOrderStatus).set(orderStatus).where(eq(tableOrderStatus.id, id))
    return "orderStatus updated successfully";
}

export const deleteOrderStatusService = async (id: number) => {
    await db.delete(tableOrderStatus).where(eq(tableOrderStatus.id, id))
    return "orderStatus deleted successfully";
}
