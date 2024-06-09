import { Context } from "hono";
import { driverService, getDriverService, createDriverService, updateDriverService, deleteDriverService } from "./driver.service";

export const listDriver = async (c: Context) => {
    try {
        //limit the number of drivers to be returned

        const limit = Number(c.req.query('limit'))

        const data = await driverService(limit);
        if (data == null || data.length == 0) {
            return c.text("driver not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getDriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await getDriverService(id);
    if (driver == undefined) {
        return c.text("driver not found", 404);
    }
    return c.json(driver, 200);
}
export const createDriver = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const createdDriver = await createDriverService(driver);


        if (!createdDriver) return c.text("driver not created", 404);
        return c.json({ msg: createdDriver }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateDriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver= await c.req.json();
    try {
        // search for the driver
        const searchedDriver = await getDriverService(id);
        if (searchedDriver == undefined) return c.text("driver not found", 404);
        // get the data and update it
        const res = await updateDriverService(id, driver);
        // return a success message
        if (!res) return c.text("driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteDriver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the driver
        const driver = await getDriverService(id);
        if (driver == undefined) return c.text("driver not found", 404);
        //deleting the driver
        const res = await deleteDriverService(id);
        if (!res) return c.text("driver not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}