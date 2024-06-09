import { Context } from "hono";
import { cityService, getCityService, createCityService, updateCityService, deleteCityService } from "./city.service";

export const listCity= async (c: Context) => {
    try {
        //limit the number of cities to be returned

        const limit = Number(c.req.query('limit'))

        const data = await cityService(limit);
        if (data == null || data.length == 0) {
            return c.text("city not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const city = await getCityService(id);
    if (city == undefined) {
        return c.text("city not found", 404);
    }
    return c.json(city, 200);
}
export const createCity = async (c: Context) => {
    try {
        const city = await c.req.json();
        const createdCity = await createCityService(city);


        if (!createdCity) return c.text("city not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const city = await c.req.json();
    try {
        // search for the city
        const searchedCity = await getCityService(id);
        if (searchedCity == undefined) return c.text("city not found", 404);
        // get the data and update it
        const res = await updateCityService(id, city);
        // return a success message
        if (!res) return c.text("city not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCity = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the city
        const city= await getCityService(id);
        if (city == undefined) return c.text("city not found", 404);
        //deleting the city
        const res = await deleteCityService(id);
        if (!res) return c.text("city not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}