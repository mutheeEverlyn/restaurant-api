import { Hono } from "hono";
import { listRestaurantOwner, getRestaurantOwner, createRestaurantOwner, updateRestaurantOwner, deleteRestaurantOwner } from "./restaurantOwner.controller"
import { zValidator } from "@hono/zod-validator";
import { restaurantOwnerSchema } from "../validators";
export const restaurantOwnerRouter = new Hono();

//get all restaurantOwner     /restaurantOwner
restaurantOwnerRouter.get("/restaurantOwner", listRestaurantOwner);
//get a single  restaurantOwner  / restaurantOwner/1
restaurantOwnerRouter.get("/ restaurantOwner/:id", getRestaurantOwner)
// create a  restaurantOwner
restaurantOwnerRouter.post("/ restaurantOwner", createRestaurantOwner)
//update a  restaurantOwner
restaurantOwnerRouter.put("/ restaurantOwner/:id", updateRestaurantOwner)

restaurantOwnerRouter.delete("/ restaurantOwner/:id", deleteRestaurantOwner)

//https:domai.com/ restaurantOwner?limit=10