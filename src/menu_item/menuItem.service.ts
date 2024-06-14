import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableMenuItem, tsMenuItem,tiMenuItem} from "../drizzle/schema"
import { truncateSync } from "fs";


export const menuItemService = async (limit?: number):Promise<tsMenuItem[] | null> => {
    if (limit) {
        return await db.query.tableMenuItem.findMany({
            limit: limit
        });
    }
    return await db.query.tableMenuItem.findMany();
}

export const getMenuItemService = async (id: number) => {
    return await db.query.tableMenuItem.findFirst({
        where: eq(tableMenuItem.id, id)
    })
}
//menuItem data
export const menuItemData= async () => {
    return await db.query.tableMenuItem.findMany({
        columns:{
          active:true,
          description:true,
          ingredients:true,
          name:true,
          price:true
        },with:{
            category:{
                columns:{
                name:true
                }
            },
           order_menu_item :{
                columns:{
                    item_price:true,
                    quantity:true,
                    price:true
                }
            },
            restaurants:{
                columns:{
                    name:true,
                    street_address:true,
                    zip_code:true
                }
            }
        }
    })
}
export const createMenuItemService = async (menuItem:any):Promise<string | null>  => {
    await db.insert(tableMenuItem).values(menuItem)
    return "menuItem created successfully";
}

export const updateMenuItemService = async (id: number, menuItem: any):Promise<string | null> => {
    await db.update(tableMenuItem).set(menuItem).where(eq(tableMenuItem.id, id))
    return "menuItem updated successfully";
}

export const deleteMenuItemService = async (id: number):Promise<string | null>  => {
    await db.delete(tableMenuItem).where(eq(tableMenuItem.id, id))
    return "menuItem deleted successfully";
}
