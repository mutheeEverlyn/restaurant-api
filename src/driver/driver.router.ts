import { Hono } from "hono";
import { listDriver, getDriver, createDriver, updateDriver, deleteDriver,carYear } from "./driver.controller"
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";
import { adminRoleAuth,userRoleAuth} from "../middleware/bearAuth";
export const driverRouter = new Hono();

//get all driver     /driver
driverRouter.get("/driver",adminRoleAuth, listDriver);
//get a single driver    /driver/1
driverRouter.get("/driver/:id",userRoleAuth, getDriver)
// create a driver
driverRouter.post("/driver",userRoleAuth, createDriver)
//update a driver
driverRouter.put("/driver/:id",adminRoleAuth, updateDriver)

driverRouter.delete("/driver/:id",adminRoleAuth, deleteDriver)

//https:domai.com/driver?limit=10
//order by
driverRouter.get("/orderCarYear", carYear);