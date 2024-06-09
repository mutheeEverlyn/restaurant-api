import { Hono } from "hono";
import { listOrderStatus, getOrderStatus, createOrderStatus, updateOrderStatus, deleteOrderStatus } from "./orderStatus.controller"
import { zValidator } from "@hono/zod-validator";
import { orderStatusSchema } from "../validators";
export const orderStatusRouter = new Hono();

//get all orderStatus    orderStatus
orderStatusRouter.get("/orderStatus",listOrderStatus);
//get a single orderStatus   orderStatus/1
orderStatusRouter.get("/orderStatus/:id", getOrderStatus)
// create an orderStatus
orderStatusRouter.post("/orderStatus", createOrderStatus)
//update an orderStatus
orderStatusRouter.put("/orderStatus/:id", updateOrderStatus)

orderStatusRouter.delete("/orderStatus/:id", deleteOrderStatus)

