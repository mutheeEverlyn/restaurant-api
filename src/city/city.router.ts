import { Hono } from "hono";
import { listCity, getCity, createCity, updateCity, deleteCity} from "./city.controller"
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
export const cityRouter = new Hono();

//get all cities     /city
cityRouter.get("/city", listCity);
//get a single city    city/1
cityRouter.get("/city/:id", getCity)
// create a city
cityRouter.post("/city", createCity)
//update a city
cityRouter.put("/city/:id", updateCity)

cityRouter.delete("/city/:id", deleteCity)
