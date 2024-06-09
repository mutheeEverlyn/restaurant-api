import { Context } from "hono";
import { stateService, getStateService, createStateService, updateStateService, deleteStateService } from "./state.service";

export const listState= async (c: Context) => {
    try {
        //limit the number of states to be returned

        const limit = Number(c.req.query('limit'))

        const data = await stateService(limit);
        if (data == null || data.length == 0) {
            return c.text("state not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await getStateService(id);
    if (state == undefined) {
        return c.text("state not found", 404);
    }
    return c.json(state, 200);
}
export const createState= async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdState = await createStateService(state);


        if (!createdState) return c.text("state not created", 404);
        return c.json({ msg: createdState}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
        // search for the state
        const searchedState = await getStateService(id);
        if (searchedState == undefined) return c.text("state not found", 404);
        // get the data and update it
        const res = await updateStateService(id, state);
        // return a success message
        if (!res) return c.text("state not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteState = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the state
        const state = await getStateService(id);
        if (state == undefined) return c.text("state not found", 404);
        //deleting the state
        const res = await deleteStateService(id);
        if (!res) return c.text("state not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}