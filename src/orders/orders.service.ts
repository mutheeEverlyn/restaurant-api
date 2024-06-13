import { eq, gt, sql } from "drizzle-orm";
import db from "../drizzle/db";
import {tableOrders, tsOrder,tiOrder} from "../drizzle/schema"


export const ordersService = async (limit?: number):Promise<tsOrder [] | null> => {
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
//price>500
export const orderPrice = async (price: number)=> {
   const orderPrices=await db.select().from(tableOrders).where(sql`${tableOrders.price}> ${price}`);
    return orderPrices;
}
//orderWithComments

export const createOrdersService = async (orders:any):Promise<string | null>  => {
    await db.insert(tableOrders).values(orders)
    return "order created successfully";
}

export const updateOrdersService = async (id: number, orders: any):Promise<string | null> => {
    await db.update(tableOrders).set(orders).where(eq(tableOrders.id, id))
    return "order updated successfully";
}

export const deleteOrdersService = async (id: number):Promise<string | null>  => {
    await db.delete(tableOrders).where(eq(tableOrders.id, id))
    return "order deleted successfully";
}
