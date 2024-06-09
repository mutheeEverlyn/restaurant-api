import { Context } from "hono";
import { ordersService, getOrdersService, createOrdersService, updateOrdersService, deleteOrdersService } from "./orders.service";

export const listOrders= async (c: Context) => {
    try {
        //limit the number of orders to be returned

        const limit = Number(c.req.query('limit'))

        const data = await ordersService(limit);
        if (data == null || data.length == 0) {
            return c.text("order not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getOrders = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orders = await getOrdersService(id);
    if (orders== undefined) {
        return c.text("order not found", 404);
    }
    return c.json(orders, 200);
}
export const createOrders = async (c: Context) => {
    try {
        const orders = await c.req.json();
        const createdOrders = await createOrdersService(orders);


        if (!createdOrders) return c.text("order not created", 404);
        return c.json({ msg: createdOrders }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOrders = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orders = await c.req.json();
    try {
        // search for the order
        const searchedOrders = await getOrdersService(id);
        if (searchedOrders == undefined) return c.text("orders not found", 404);
        // get the data and update it
        const res = await updateOrdersService(id, orders);
        // return a success message
        if (!res) return c.text("order not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrders= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the order
        const orders = await getOrdersService(id);
        if (orders== undefined) return c.text("order not found", 404);
        //deleting the order
        const res = await deleteOrdersService(id);
        if (!res) return c.text("order not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}