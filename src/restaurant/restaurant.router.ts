import { Hono } from "hono";
import { listRestaurant, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant,getRestaurantData} from "./restaurant.controller"
import { zValidator } from "@hono/zod-validator";
import { restaurantSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const restaurantRouter = new Hono();

//get all restaurants     restaurant
restaurantRouter.get("/restaurant",userAdminRoleAuth, listRestaurant);
//get a single restaurant    restaurant/1
restaurantRouter.get("/restaurant/:id",userAdminRoleAuth, getRestaurant)
// create a restaurant 
restaurantRouter.post("/restaurant",zValidator('json',restaurantSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createRestaurant)
//update a restaurant
restaurantRouter.put("/restaurant/:id",adminRoleAuth,updateRestaurant)

restaurantRouter.delete("/restaurant/:id",adminRoleAuth, deleteRestaurant)
//get all restaurant and owners
restaurantRouter.get("/restaurantData",userAdminRoleAuth,getRestaurantData);