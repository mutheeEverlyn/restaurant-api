import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableStatusCatalog, tsStatusCatalog,tiStatusCatalog} from "../drizzle/schema"


export const statusCatalogService = async (limit?: number):Promise<tsStatusCatalog[] | unknown> => {
    if (limit) {
        return await db.query.tableStatusCatalog.findMany({
            limit: limit
        });
    }
    return await db.query.tableStatusCatalog.findMany();
}

export const getStatusCatalogService = async (id: number):Promise<tsStatusCatalog[] | unknown>  => {
    return await db.query.tableStatusCatalog.findFirst({
        where: eq(tableStatusCatalog.id, id)
    })
}
//with
export const withStatusCatalog = async ():Promise<tsStatusCatalog[] | unknown>  => {
    return await db.query.tableStatusCatalog.findMany({
        with:{
            order_status:true
        },
    })
    
}

export const createStatusCatalogService = async (statusCatalog:any):Promise<tiStatusCatalog[] | unknown>  => {
    await db.insert(tableStatusCatalog).values(statusCatalog)
    return "StatusCatalog created successfully";
}

export const updateStatusCatalogService = async (id: number, statusCatalog: any):Promise<tiStatusCatalog[] | unknown>  => {
    await db.update(tableStatusCatalog).set(statusCatalog).where(eq(tableStatusCatalog.id, id))
    return "StatusCatalog updated successfully";
}

export const deleteStatusCatalogService = async (id: number):Promise<string | null>  => {
    await db.delete(tableStatusCatalog).where(eq(tableStatusCatalog.id, id))
    return "StatusCatalog deleted successfully";
}
