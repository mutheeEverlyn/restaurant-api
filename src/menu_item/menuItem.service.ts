import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableMenuItem, tsMenuItem,tiMenuItem} from "../drizzle/schema"


export const menuItemService = async (limit?: number):Promise<tsMenuItem[] | unknown> => {
    if (limit) {
        return await db.query.tableMenuItem.findMany({
            limit: limit
        });
    }
    return await db.query.tableMenuItem.findMany();
}

export const getMenuItemService = async (id: number):Promise<tsMenuItem[] | unknown> => {
    return await db.query.tableMenuItem.findFirst({
        where: eq(tableMenuItem.id, id)
    })
}

export const createMenuItemService = async (menuItem:any):Promise<tiMenuItem[] | unknown> => {
    await db.insert(tableMenuItem).values(menuItem)
    return "menuItem created successfully";
}

export const updateMenuItemService = async (id: number, menuItem: any):Promise<tiMenuItem[] | unknown> => {
    await db.update(tableMenuItem).set(menuItem).where(eq(tableMenuItem.id, id))
    return "menuItem updated successfully";
}

export const deleteMenuItemService = async (id: number):Promise<string | null>  => {
    await db.delete(tableMenuItem).where(eq(tableMenuItem.id, id))
    return "menuItem deleted successfully";
}
