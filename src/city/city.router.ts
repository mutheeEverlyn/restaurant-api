import { Hono } from "hono";
import { listCity, getCity, createCity, updateCity, deleteCity,namesLike,getCityWithRestaurant} from "./city.controller"
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const cityRouter = new Hono();

//get all cities     /city
cityRouter.get("/city",userAdminRoleAuth, listCity);
//get a single city    city/1
cityRouter.get("/city/:id",userAdminRoleAuth, getCity)
// create a city
cityRouter.post("/city",zValidator('json',citySchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createCity)
//update a city
cityRouter.put("/city/:id",adminRoleAuth,updateCity)

cityRouter.delete("/city/:id",adminRoleAuth, deleteCity)
//names like
cityRouter.get("/cityNames",userAdminRoleAuth, namesLike);
//cityWithRestaurant
cityRouter.get("/cityWithRestaurant",userAdminRoleAuth, getCityWithRestaurant);