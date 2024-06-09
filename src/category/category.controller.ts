import { Context } from "hono";
import { categoryService, getCategoryService, createCategoryService, updateCategoryService, deleteCategoryService } from "./category.service";

export const listCategory = async (c: Context) => {
    try {
        //limit the number of category to be returned

        const limit = Number(c.req.query('limit'))

        const data = await categoryService(limit);
        if (data == null || data.length == 0) {
            return c.text("category not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCategory = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const category = await getCategoryService(id);
    if (category == undefined) {
        return c.text("category not found", 404);
    }
    return c.json(category, 200);
}
export const createCategory = async (c: Context) => {
    try {
        const category = await c.req.json();
        const createdCategory = await createCategoryService(category);


        if (!createdCategory) return c.text("category not created", 404);
        return c.json({ msg: createdCategory}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCategory= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const category= await c.req.json();
    try {
        // search for the category
        const searchedCategory = await getCategoryService(id);
        if (searchedCategory == undefined) return c.text("category not found", 404);
        // get the data and update it
        const res = await updateCategoryService(id, category);
        // return a success message
        if (!res) return c.text("category not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCategory = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the category
        const category = await getCategoryService(id);
        if (category == undefined) return c.text("category not found", 404);
        //deleting the category
        const res = await deleteCategoryService(id);
        if (!res) return c.text("category not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}