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
//orderStatus data
export const orderStatusData= async ()  => {
    return await db.query.tableOrderStatus.findMany({
        columns:{
           created_at:true,
        },with:{
           orders :{
                columns:{
                  actual_delivery_time:true,
                  delivery_address_id:true,
                  price:true,
                  created_at:true,
                  comment:true
                }
            },
            status_catalog:{
                columns:{
                   name:true
                }
            }
        }
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
