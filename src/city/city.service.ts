import { eq,ilike,like } from "drizzle-orm";
import db from "../drizzle/db";
import {tableCity} from "../drizzle/schema"


export const cityService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableCity.findMany({
            limit: limit
        });
    }
    return await db.query.tableCity.findMany();
}

export const getCityService = async (id: number) => {
    return await db.query.tableCity.findFirst({
        where: eq(tableCity.id, id)
    })
}
//getting city with specific names
export const cityNameLike=async (cityName:string) =>{
    const name=await db.select().from(tableCity).where(ilike(tableCity.name,`${cityName}%`));
    return name;
}
//getting city with restaurants
export const cityWithRestaurant= async () => {
    return await db.query.tableCity.findMany({
        columns:{
          name:true,
          address:true
        },with:{
            restaurants:{
                columns:{
                name:true,
                city_id:true
                }
            }
        }
    })
}
export const createCityService = async (city:any) => {
    await db.insert(tableCity).values(city)
    return "city created successfully";
}

export const updateCityService = async (id: number, city: any) => {
    await db.update(tableCity).set(city).where(eq(tableCity.id, id))
    return "city updated successfully";
}

export const deleteCityService = async (id: number) => {
    await db.delete(tableCity).where(eq(tableCity.id, id))
    return "city deleted successfully";
}
