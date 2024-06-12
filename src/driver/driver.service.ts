import { eq,sql } from "drizzle-orm";
import db from "../drizzle/db";
import {tableDriver} from "../drizzle/schema"


export const driverService = async (limit?: number) => {
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

export const createDriverService = async (driver:any) => {
    await db.insert(tableDriver).values(driver)
    return "driver created successfully";
}

export const updateDriverService = async (id: number, driver: any) => {
    await db.update(tableDriver).set(driver).where(eq(tableDriver.id, id))
    return "driver updated successfully";
}

export const deleteDriverService = async (id: number) => {
    await db.delete(tableDriver).where(eq(tableDriver.id, id))
    return "driver deleted successfully";
}
