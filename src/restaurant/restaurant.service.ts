import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { tableRestaurant, tableRestaurantOwner, tsRestaurant,tiRestaurant} from "../drizzle/schema"


export const restaurantService = async (limit?: number):Promise<tsRestaurant[] | null> => {
    if (limit) {
        return await db.query.tableRestaurant.findMany({
            limit: limit
        });
    }
    return await db.query.tableRestaurant.findMany();
}

export const getRestaurantService = async (id: number) => {
    return await db.query.tableRestaurant.findFirst({
        where: eq(tableRestaurant.id, id)
    })
}
//getting restaurants data
export const restaurantData= async ()  => {
    return await db.query.tableRestaurant.findMany({
        columns:{
           name:true,
           street_address:true,
           zip_code:true,
           created_at:true
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
            city:{
                columns:{
                name:true,
                address:true
                }
            },
            menu_item:{
                columns:{
                    active:true,
                    description:true,
                    name:true,
                    ingredients:true,
                    price:true,
                    created_at:true,
                     updated_at:true
                }
            }
        }
    })
}


export const createRestaurantService = async (restaurant:any):Promise<string | null>  => {
    await db.insert(tableRestaurant).values(restaurant)
    return "restaurant created successfully";
}

export const updateRestaurantService = async (id: number, restaurant: any):Promise<string | null>  => {
    await db.update(tableRestaurant).set(restaurant).where(eq(tableRestaurant.id, id))
    return "restaurant updated successfully";
}

export const deleteRestaurantService = async (id: number):Promise<string | null>  => {
    await db.delete(tableRestaurant).where(eq(tableRestaurant.id, id))
    return "restaurant deleted successfully";
}
