import { eq,sql } from "drizzle-orm";
import db from "../drizzle/db";
import {tableDriver, tsDriver,tiDriver} from "../drizzle/schema"


export const driverService = async (limit?: number):Promise<tsDriver[] | null> => {
    if (limit) {
        return await db.query.tableDriver.findMany({
            limit: limit
        });
    }
    return await db.query.tableDriver.findMany();
}

export const getDriverService = async (id: number) => {
    return await db.query.tableDriver.findFirst({
        where: eq(tableDriver.id, id)
    })
}
//orderby

export const descCarYear = async () => {
    const orderCarYear =await db.select().from(tableDriver).orderBy(sql`${tableDriver.car_year} desc `);
    return orderCarYear;
}
//drivers data

export const driversData= async () => {
    return await db.query.tableDriver.findMany({
        columns:{
          online:true,
          delivering:true,
          car_make:true
        },with:{
            users:{
                columns:{
                    name:true,
                    contact_phone:true,
                }
            },
            orders:{
                columns:{
                    actual_delivery_time:true,
                    comment:true,
                    delivery_address_id:true
                }
            }
        }
    })
}
export const createDriverService = async (driver:any):Promise<string | null>  => {
    await db.insert(tableDriver).values(driver)
    return "driver created successfully";
}

export const updateDriverService = async (id: number, driver: any):Promise<string | null>  => {
    await db.update(tableDriver).set(driver).where(eq(tableDriver.id, id))
    return "driver updated successfully";
}

export const deleteDriverService = async (id: number):Promise<string | null>  => {
    await db.delete(tableDriver).where(eq(tableDriver.id, id))
    return "driver deleted successfully";
}
