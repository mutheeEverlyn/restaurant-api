import { Context } from "hono";
import { menuItemService, getMenuItemService, createMenuItemService, updateMenuItemService, deleteMenuItemService } from "./menuItem.service";

export const listMenuItem = async (c: Context) => {
    try {
        //limit the number of menuItem to be returned

        const limit = Number(c.req.query('limit'))

        const data = await menuItemService(limit);
        if (data == null || data.length == 0) {
            return c.text("menuItem not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMenuItem= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menuItem = await getMenuItemService(id);
    if (menuItem == undefined) {
        return c.text("menuItem not found", 404);
    }
    return c.json(menuItem, 200);
}
export const createMenuItem = async (c: Context) => {
    try {
        const menuItem = await c.req.json();
        const createdMenuItem = await createMenuItemService(menuItem);


        if (!createdMenuItem) return c.text("menuItem not created", 404);
        return c.json({ msg: createdMenuItem }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menuItem = await c.req.json();
    try {
        // search for the menuItem
        const searchedMenuItem = await getMenuItemService(id);
        if (searchedMenuItem == undefined) return c.text("menuItem not found", 404);
        // get the data and update it
        const res = await updateMenuItemService(id, menuItem);
        // return a success message
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteMenuItem = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the menuItem
        const menuItem = await getMenuItemService(id);
        if (menuItem == undefined) return c.text("menuItem not found", 404);
        //deleting the menuItem
        const res = await deleteMenuItemService(id);
        if (!res) return c.text("menuItem not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}