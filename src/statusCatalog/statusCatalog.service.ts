import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableStatusCatalog} from "../drizzle/schema"


export const statusCatalogService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableStatusCatalog.findMany({
            limit: limit
        });
    }
    return await db.query.tableStatusCatalog.findMany();
}

export const getStatusCatalogService = async (id: number) => {
    return await db.query.tableStatusCatalog.findFirst({
        where: eq(tableStatusCatalog.id, id)
    })
}

export const createStatusCatalogService = async (statusCatalog:any) => {
    await db.insert(tableStatusCatalog).values(statusCatalog)
    return "StatusCatalog created successfully";
}

export const updateStatusCatalogService = async (id: number, statusCatalog: any) => {
    await db.update(tableStatusCatalog).set(statusCatalog).where(eq(tableStatusCatalog.id, id))
    return "StatusCatalog updated successfully";
}

export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(tableStatusCatalog).where(eq(tableStatusCatalog.id, id))
    return "StatusCatalog deleted successfully";
}
