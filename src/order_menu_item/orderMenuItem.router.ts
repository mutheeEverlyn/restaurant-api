import { Hono } from "hono";
import { listOrderMenuItem, getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from "./orderMenuitem.controller"
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemSchema } from "../validators";
export const orderMenuItemRouter = new Hono();

//get all orderMenuitem      /orderMenuItem
orderMenuItemRouter.get("/orderMenuItem", listOrderMenuItem);
//get a single orderMenuItem    /orderMenuItem/1
orderMenuItemRouter.get("/ordermenuItem/:id", getOrderMenuItem)
// create an orderMenuItem
orderMenuItemRouter.post("/orderMenuItem", createOrderMenuItem)
//update a orderMenuItem
orderMenuItemRouter.put("/orderMenuItem/:id", updateOrderMenuItem)

orderMenuItemRouter.delete("/orderMenuItem/:id", deleteOrderMenuItem)

//https:domai.com/orderMenuItem?limit=10