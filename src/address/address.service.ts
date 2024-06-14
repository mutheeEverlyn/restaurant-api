import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableAddress, tsAddress,tiAddress} from "../drizzle/schema"


export const addressService = async (limit?: number):Promise<tsAddress[] | null> => {
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
export const limitAddress = async (limit: number):Promise<tsAddress[] | null> => {
    return await db.select().from(tableAddress).limit(limit);
  };
//address data

export const addressData= async ()  => {
    return await db.query.tableAddress.findMany({
        columns:{
           city_id:true,
           user_id:true,
           street_address_1:true,
           street_address_2:true
        },
        with:{
            orders:{
                columns:{
                   delivery_address_id:true,
                   user_id:true,
                   restaurant_id:true 
                }
            },
            city:{
                columns:{
                    address:true,
                    name:true
                }
            },
            users:{
                columns:{
                    contact_phone:true,
                    email:true,
                    name:true,
                    email_verified:true,
                    phone_verified:true
                }
            }
        }
    })
}
export const createAddressService = async (address:any):Promise<string | null>  => {
    await db.insert(tableAddress).values(address)
    return "Address created successfully";
}

export const updateAddressService = async (id: number,address: any):Promise<string | null>  => {
    await db.update(tableAddress).set(address).where(eq(tableAddress.id, id))
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number):Promise<string | null>  => {
    await db.delete(tableAddress).where(eq(tableAddress.id, id))
    return "Addressdeleted successfully";
}
