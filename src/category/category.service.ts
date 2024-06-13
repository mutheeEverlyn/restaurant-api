import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableCategory, tsCategory,tiCategory} from "../drizzle/schema"


export const categoryService = async (limit?: number):Promise<tsCategory[] | unknown> => {
    if (limit) {
        return await db.query.tableCategory.findMany({
            limit: limit
        });
    }
    return await db.query.tableCategory.findMany();
}

export const getCategoryService = async (id: number):Promise<tsCategory[] | unknown> => {
    return await db.query.tableCategory.findFirst({
        where: eq(tableCategory.id, id)
    })
}
//category with menuitem
export const categoryWithMenuItems= async ():Promise<tsCategory[] | unknown> => {
    return await db.query.tableCategory.findMany({
        columns:{
         name:true
        },with:{
            menu_item:{
                columns:{
                    active:true,
                    price:true,
                    ingredients:true
                }
            }
        }
    })
}

export const createCategoryService = async (category:any):Promise<tiCategory[] | unknown> => {
    await db.insert(tableCategory).values(category)
    return "category created successfully";
}

export const updateCategoryService = async (id: number, category: any):Promise<tiCategory[] | unknown> => {
    await db.update(tableCategory).set(category).where(eq(tableCategory.id, id))
    return "category updated successfully";
}

export const deleteCategoryService = async (id: number):Promise<string | null>  => {
    await db.delete(tableCategory).where(eq(tableCategory.id, id))
    return "category deleted successfully";
}
