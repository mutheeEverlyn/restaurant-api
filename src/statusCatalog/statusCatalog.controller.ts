import { Context } from "hono";
import { statusCatalogService, getStatusCatalogService, createStatusCatalogService, updateStatusCatalogService, deleteStatusCatalogService } from "./statusCatalog.service";

export const listStatusCatalog= async (c: Context) => {
    try {
        //limit the number of StatusCatalog to be returned

        const limit = Number(c.req.query('limit'))

        const data = await statusCatalogService(limit);
        if (data == null || data.length == 0) {
            return c.text("StatusCatalog not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getStatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const statusCatalog = await getStatusCatalog( id );
    if (statusCatalog == undefined) {
        return c.text("StatusCatalog not found", 404);
    }
    return c.json(statusCatalog, 200);
}
export const createStatusCatalog= async (c: Context) => {
    try {
        const statusCatalog = await c.req.json();
        const createdStatusCatalog= await createStatusCatalogService(statusCatalog);


        if (!createdStatusCatalog) return c.text("StatusCatalog not created", 404);
        return c.json({ msg: createdStatusCatalog}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateStatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const statusCatalog = await c.req.json();
    try {
        // search for the StatusCatalog
        const searchedStatusCatalog = await getStatusCatalogService(id);
        if (searchedStatusCatalog == undefined) return c.text("StatusCatalog not found", 404);
        // get the data and update it
        const res = await updateStatusCatalogService(id, statusCatalog);
        // return a success message
        if (!res) return c.text("StatusCatalog not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteStatusCatalog = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the StatusCatalog
        const statusCatalog = await getStatusCatalogService(id);
        if (statusCatalog== undefined) return c.text("StatusCatalog not found", 404);
        //deleting the StatusCatalog
        const res = await deleteStatusCatalogService(id);
        if (!res) return c.text("StatusCatalog not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}