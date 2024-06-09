import { Hono } from "hono";
import { listRestaurant, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant} from "./restaurant.controller"
import { zValidator } from "@hono/zod-validator";
import { restaurantSchema } from "../validators";
export const restaurantRouter = new Hono();

//get all restaurants     restaurant
restaurantRouter.get("/restaurant", listRestaurant);
//get a single restaurant    restaurant/1
restaurantRouter.get("/restaurant/:id", getRestaurant)
// create a restaurant 
restaurantRouter.post("/restaurant", createRestaurant)
//update a restaurant
restaurantRouter.put("/restaurant/:id", updateRestaurant)

restaurantRouter.delete("/restaurant/:id", deleteRestaurant)
