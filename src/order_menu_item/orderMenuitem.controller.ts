import { Context } from "hono";
import { orderMenuItemService, getOrderMenuItemService, createOrderMenuItemService, updateOrderMenuItemService, deleteOrderMenuItemService,orderMenuItem } from "./orderMenuItem.service";
import { ordermenuItem } from "../drizzle/schema";

export const listOrderMenuItem = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'))

        const data = await orderMenuItemService(limit);
        if (data == null || data.length == 0) {
            return c.text("orderMenuItem not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getOrderMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderMenuItem = await getOrderMenuItemService(id);
    if (ordermenuItem == undefined) {
        return c.text("orderMenuItem not found", 404);
    }
    return c.json(orderMenuItem, 200);
}
//or gt lt
export const orderGtOrLt = async (c: Context) => {
    try {
        const quantity1 = Number(c.req.query('quantity1'));
        const quantity2 = Number(c.req.query('quantity2'));

        // Validate the query parameters
        if (isNaN(quantity1)) return c.text('Invalid quantity1', 400);
        if (isNaN(quantity2)) return c.text('Invalid quantity2', 400);

        // Execute the database query
        const quantityRange = await orderMenuItem(quantity1, quantity2);
        // Return the result as JSON
        return c.json(quantityRange, 200);
    } catch (error) {
        console.error('Error executing database query:', error);
        // Return an internal server error response
        return c.text('Internal Server Error', 500);
    }
};
export const createOrderMenuItem = async (c: Context) => {
    try {
        const orderMenuItem = await c.req.json();
        const createdOrderMenuItem= await createOrderMenuItemService(orderMenuItem);


        if (!createdOrderMenuItem) return c.text("orderMenuItem not created", 404);
        return c.json({ msg: createdOrderMenuItem}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOrderMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderMenuItem = await c.req.json();
    try {
        // search for the orderMenuItem
        const searchedOrderMenuItem = await getOrderMenuItemService(id);
        if (searchedOrderMenuItem == undefined) return c.text("orderMenuItem not found", 404);
        // get the data and update it
        const res = await updateOrderMenuItemService(id, orderMenuItem);
        // return a success message
        if (!res) return c.text("orderMenuItem not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrderMenuItem = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the orderMenuItem
        const orderMenuItem = await getOrderMenuItemService(id);
        if (orderMenuItem == undefined) return c.text("orderMenuItem not found", 404);
        //deleting the ordermenuItem
        const res = await deleteOrderMenuItemService(id);
        if (!res) return c.text("orderMenuItem not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}