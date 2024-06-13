import { Hono } from "hono";
import { listDriver, getDriver, createDriver, updateDriver, deleteDriver,carYear } from "./driver.controller"
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const driverRouter = new Hono();

//get all driver     /driver
driverRouter.get("/driver",adminRoleAuth, listDriver);
//get a single driver    /driver/1
driverRouter.get("/driver/:id",userAdminRoleAuth, getDriver);
// create a driver
driverRouter.post("/driver",zValidator('json',driverSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createDriver);
//update a driver
driverRouter.put("/driver/:id",adminRoleAuth, updateDriver);

driverRouter.delete("/driver/:id",adminRoleAuth, deleteDriver);

//order by
driverRouter.get("/orderCarYear",userAdminRoleAuth, carYear);