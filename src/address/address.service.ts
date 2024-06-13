import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableAddress} from "../drizzle/schema"


export const addressService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableAddress.findMany({
            limit: limit
        });
    }
    return await db.query.tableAddress.findMany();
}

export const getAddressService = async (id: number) => {
    return await db.query.tableAddress.findFirst({
        where: eq(tableAddress.id, id)
    })
}
//limit
export const limitAddress = async (limit: number) => {
    return await db.select().from(tableAddress).limit(limit);
  };
//address with city users and orders

export const addressWithOrders= async () => {
    return await db.query.tableAddress.findMany({
        columns:{
           city_id:true,
           user_id:true,
           street_address_1:true,
           street_address_2:true
        },with:{
            orders:{
                columns:{
                   delivery_address_id:true,
                   user_id:true,
                   restaurant_id:true 
                }
            }
        }
    })
}
export const createAddressService = async (address:any) => {
    await db.insert(tableAddress).values(address)
    return "Address created successfully";
}

export const updateAddressService = async (id: number,address: any) => {
    await db.update(tableAddress).set(address).where(eq(tableAddress.id, id))
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number) => {
    await db.delete(tableAddress).where(eq(tableAddress.id, id))
    return "Addressdeleted successfully";
}
