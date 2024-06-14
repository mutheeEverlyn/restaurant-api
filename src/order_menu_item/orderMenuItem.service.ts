import { eq,sql } from "drizzle-orm";
import db from "../drizzle/db";
import {tableOrderMenuItem, tsOrderMenuItem,tiOrderMenuItem} from "../drizzle/schema"


export const orderMenuItemService = async (limit?: number):Promise<tsOrderMenuItem[] | null> => {
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
//orderMenuItem  data
export const orderMenuItemData= async ()  => {
    return await db.query.tableOrderMenuItem.findMany({
        columns:{
          item_price:true,
          quantity:true
        },with:{
            menu_item:{
                columns:{
                   active:true,
                   name:true,
                   price:true
                }
            },
            orders:{
                columns:{
                    actual_delivery_time:true,
                    comment:true,
                    delivery_address_id:true,
                    price:true
                }
            }
        }
    })
}
export const createOrderMenuItemService = async (orderMenuItem:any):Promise<string | null>   => {
    await db.insert(tableOrderMenuItem).values(orderMenuItem)
    return "orderMenuItem created successfully";
}

export const updateOrderMenuItemService = async (id: number, orderMenuItem: any):Promise<string | null>   => {
    await db.update(tableOrderMenuItem).set(orderMenuItem).where(eq(tableOrderMenuItem.id, id))
    return "OrderMenuItem updated successfully";
}

export const deleteOrderMenuItemService = async (id: number):Promise<string | null>  => {
    await db.delete(tableOrderMenuItem).where(eq(tableOrderMenuItem.id, id))
    return "ordermenuItem deleted successfully";
}
