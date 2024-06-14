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
//orders data

export const orderData = async () => {
    return await db.query.tableOrders.findMany({
        columns:{
           actual_delivery_time:true,
           price:true,
           updated_at:true,
           final_price:true,
           created_at:true,
           discount:true,
           delivery_address_id:true
        },
        with:{
            users:{
                columns:{
                  contact_phone:true,
                  name:true,
                  email:true
                }
            },
            restaurant:{
                columns:{
                         name:true,
                         street_address:true
                }
            },
            order_status:{
                columns:{
                         created_at:true
                          
                }
            },
            address:{
                columns:{
                          delivery_instructions:true,
                          street_address_1:true,
                          street_address_2:true,
                          zip_code:true
                }
            },
            comment:{
                columns:{
                         comment_text:true,
                         created_at:true 
                }
            },
            driver:{
                columns:{
                         car_make:true,
                         car_year:true,
                         online:true,
                        delivering:true
                }
            },
            order_menu_item:{
                columns:{
                          item_price:true,
                          quantity:true,
                          price:true
                }
            }
        }
    })
}
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
