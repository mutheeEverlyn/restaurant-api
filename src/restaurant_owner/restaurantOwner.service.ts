import { between, eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableRestaurantOwner, tsRestaurantOwner,tiRestaurantOwner} from "../drizzle/schema"


export const  restaurantOwnerService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableOrderMenuItem.findMany({
            limit: limit
        });
    }
    return await db.query.tableRestaurantOwner.findMany();
}

export const getRestaurantOwnerService = async (id: number) => {
    return await db.query.tableRestaurantOwner.findFirst({
        where: eq(tableRestaurantOwner.id, id)
    })
}
//restaurant owner data
export const restaurantOwnerData= async ()  => {
    return await db.query.tableRestaurantOwner.findMany({
        columns:{
          
        },with:{
           restaurant :{
                columns:{
                 created_at:true,
                 name:true,
                 street_address:true,
                 zip_code:true
                }
            },
            users:{
                columns:{
                   contact_phone:true,
                   email:true,
                   name:true
                }
            }
        }
    })
}

export const createRestaurantOwnerService = async ( restaurantOwner:any):Promise<string | null>  => {
    await db.insert(tableRestaurantOwner).values( restaurantOwner)
    return " restaurantOwner created successfully";
}

export const updateRestaurantOwnerService = async (id: number,  restaurantOwner: any):Promise<string | null>  => {
    await db.update(tableRestaurantOwner).set(restaurantOwner).where(eq(tableRestaurantOwner.id, id))
    return "restaurantOwner updated successfully";
}

export const deleteRestaurantOwnerService = async (id: number):Promise<string | null>  => {
    await db.delete(tableRestaurantOwner).where(eq(tableRestaurantOwner.id, id))
    return "restaurantOwner deleted successfully";
}
