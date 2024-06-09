import { Context } from "hono";
import { orderStatusService, getOrderStatusService, createOrderStatusService, updateOrderStatusService, deleteOrderStatusService } from "./orderStatus.service";

export const listOrderStatus= async (c: Context) => {
    try {
        //limit the number of orderstatus to be returned

        const limit = Number(c.req.query('limit'))

        const data = await orderStatusService(limit);
        if (data == null || data.length == 0) {
            return c.text("orderStatus not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getOrderStatus = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderStatus = await getOrderStatusService(id);
    if (orderStatus== undefined) {
        return c.text("orderstatus not found", 404);
    }
    return c.json(orderStatus, 200);
}
export const createOrderStatus = async (c: Context) => {
    try {
        const orderStatus = await c.req.json();
        const createdOrderStatus = await createOrderStatusService(orderStatus);


        if (!createdOrderStatus) return c.text("orderstatus not created", 404);
        return c.json({ msg: createdOrderStatus }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateOrderStatus= async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orderStatus = await c.req.json();
    try {
        // search for the orderStatus
        const searchedOrderStatus= await getOrderStatusService(id);
        if (searchedOrderStatus == undefined) return c.text("orderStatus not found", 404);
        // get the data and update it
        const res = await updateOrderStatusService(id, orderStatus);
        // return a success message
        if (!res) return c.text("orderStatus not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteOrderStatus= async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the orderStatus
        const orderStatus = await getOrderStatusService(id);
        if (orderStatus== undefined) return c.text("orderStatus not found", 404);
        //deleting the orderStatus
        const res = await deleteOrderStatusService(id);
        if (!res) return c.text("orderStatus not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}