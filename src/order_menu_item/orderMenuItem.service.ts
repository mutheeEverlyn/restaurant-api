import { eq,sql } from "drizzle-orm";
import db from "../drizzle/db";
import {tableOrderMenuItem} from "../drizzle/schema"


export const orderMenuItemService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableOrderMenuItem.findMany({
            limit: limit
        });
    }
    return await db.query.tableOrderMenuItem.findMany();
}

export const getOrderMenuItemService = async (id: number) => {
    return await db.query.tableOrderMenuItem.findFirst({
        where: eq(tableOrderMenuItem.id, id)
    })
}
//or gt and lt
export const orderMenuItem = async (quantity1: number, quantity2: number) => {
    try {
        const result = await db.execute(sql`
            SELECT * FROM tableOrderMenuItem 
            WHERE quantity > ${quantity1} 
               OR quantity < ${quantity2}
        `);
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        throw new Error('Database query failed');
    }
};
export const createOrderMenuItemService = async (orderMenuItem:any) => {
    await db.insert(tableOrderMenuItem).values(orderMenuItem)
    return "orderMenuItem created successfully";
}

export const updateOrderMenuItemService = async (id: number, orderMenuItem: any) => {
    await db.update(tableOrderMenuItem).set(orderMenuItem).where(eq(tableOrderMenuItem.id, id))
    return "OrderMenuItem updated successfully";
}

export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(tableOrderMenuItem).where(eq(tableOrderMenuItem.id, id))
    return "ordermenuItem deleted successfully";
}
