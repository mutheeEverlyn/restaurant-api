import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableOrders} from "../drizzle/schema"


export const ordersService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableOrders.findMany({
            limit: limit
        });
    }
    return await db.query.tableOrders.findMany();
}

export const getOrdersService = async (id: number) => {
    return await db.query.tableOrders.findFirst({
        where: eq(tableOrders.id, id)
    })
}

export const createOrdersService = async (orders:any) => {
    await db.insert(tableOrders).values(orders)
    return "order created successfully";
}

export const updateOrdersService = async (id: number, orders: any) => {
    await db.update(tableOrders).set(orders).where(eq(tableOrders.id, id))
    return "order updated successfully";
}

export const deleteOrdersService = async (id: number) => {
    await db.delete(tableOrders).where(eq(tableOrders.id, id))
    return "order deleted successfully";
}
