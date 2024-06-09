import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableCategory} from "../drizzle/schema"


export const categoryService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableCategory.findMany({
            limit: limit
        });
    }
    return await db.query.tableCategory.findMany();
}

export const getCategoryService = async (id: number) => {
    return await db.query.tableCategory.findFirst({
        where: eq(tableCategory.id, id)
    })
}

export const createCategoryService = async (category:any) => {
    await db.insert(tableCategory).values(category)
    return "category created successfully";
}

export const updateCategoryService = async (id: number, category: any) => {
    await db.update(tableCategory).set(category).where(eq(tableCategory.id, id))
    return "category updated successfully";
}

export const deleteCategoryService = async (id: number) => {
    await db.delete(tableCategory).where(eq(tableCategory.id, id))
    return "category deleted successfully";
}
