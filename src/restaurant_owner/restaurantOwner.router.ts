import { Hono } from "hono";
import { listRestaurantOwner, getRestaurantOwner, createRestaurantOwner, updateRestaurantOwner,deleteRestaurantOwner ,restaurantBetween } from "./restaurantOwner.controller"
import { zValidator } from "@hono/zod-validator";
import { restaurantOwnerSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const restaurantOwnerRouter = new Hono();

//get all restaurantOwner     /restaurantOwner
restaurantOwnerRouter.get("/restaurantOwner",adminRoleAuth, listRestaurantOwner);
//get a single  restaurantOwner  / restaurantOwner/1
restaurantOwnerRouter.get("/restaurantOwner/:id",userAdminRoleAuth, getRestaurantOwner);
// create a  restaurantOwner
restaurantOwnerRouter.post("/restaurantOwner",zValidator('json',restaurantOwnerSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}) ,adminRoleAuth,createRestaurantOwner);
//update a  restaurantOwner
restaurantOwnerRouter.put("/restaurantOwner/:id",adminRoleAuth, updateRestaurantOwner);

restaurantOwnerRouter.delete("/restaurantOwner/:id",adminRoleAuth, deleteRestaurantOwner);
//between
restaurantOwnerRouter.get("/restaurantIdBetween",adminRoleAuth, restaurantBetween);
