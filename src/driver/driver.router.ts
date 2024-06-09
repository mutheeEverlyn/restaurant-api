import { Hono } from "hono";
import { listDriver, getDriver, createDriver, updateDriver, deleteDriver } from "./driver.controller"
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";
export const driverRouter = new Hono();

//get all driver     /driver
driverRouter.get("/driver", listDriver);
//get a single driver    /driver/1
driverRouter.get("/driver/:id", getDriver)
// create a driver
driverRouter.post("/driver", createDriver)
//update a driver
driverRouter.put("/driver/:id", updateDriver)

driverRouter.delete("/driver/:id", deleteDriver)

//https:domai.com/driver?limit=10