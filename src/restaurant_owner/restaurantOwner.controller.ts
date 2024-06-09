import { Context } from "hono";
import { restaurantOwnerService, getRestaurantOwnerService, createRestaurantOwnerService, updateRestaurantOwnerService, deleteRestaurantOwnerService } from "./restaurantOwner.service";

export const listRestaurantOwner= async (c: Context) => {
    try {
        //limit the number of restaurantOwner to be returned

        const limit = Number(c.req.query('limit'))

        const data = await restaurantOwnerService(limit);
        if (data == null || data.length == 0) {
            return c.text("restaurantOwner not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getRestaurantOwner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurantOwner = await getRestaurantOwnerService(id);
    if (restaurantOwner == undefined) {
        return c.text("restaurantowner not found", 404);
    }
    return c.json(restaurantOwner, 200);
}
export const createRestaurantOwner = async (c: Context) => {
    try {
        const restaurantOwner = await c.req.json();
        const createdRestaurantOwner= await createRestaurantOwnerService(restaurantOwner);


        if (!createdRestaurantOwner) return c.text("restaurantOwner not created", 404);
        return c.json({ msg: createdRestaurantOwner }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateRestaurantOwner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restaurantOwner= await c.req.json();
    try {
        // search for the restaurantOwner
        const searchedRestaurantOwner = await getRestaurantOwnerService(id);
        if (searchedRestaurantOwner == undefined) return c.text("restaurantOwner not found", 404);
        // get the data and update it
        const res = await updateRestaurantOwnerService(id, restaurantOwner);
        // return a success message
        if (!res) return c.text("restaurantOwner not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteRestaurantOwner = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the restaurantOwner
        const restaurantOwner = await getRestaurantOwnerService(id);
        if (restaurantOwner == undefined) return c.text("restaurantowner not found", 404);
        //deleting the restaurantOwner
        const res = await deleteRestaurantOwnerService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}