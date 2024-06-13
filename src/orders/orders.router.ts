import { Hono } from "hono";
import { listOrders, getOrders, createOrders, updateOrders, deleteOrders,priceOrders } from "./orders.controller"
import { zValidator } from "@hono/zod-validator";
import { ordersSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const ordersRouter = new Hono();

//get all orders     orders
ordersRouter.get("/orders",adminRoleAuth, listOrders);
//get a single order   orders/1
ordersRouter.get("/orders/:id",userAdminRoleAuth, getOrders)
// create an order
ordersRouter.post("/orders",zValidator('json',ordersSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), userRoleAuth,createOrders)
//update an order
ordersRouter.put("/orders/:id",adminRoleAuth, updateOrders)

ordersRouter.delete("/orders/:id",adminRoleAuth, deleteOrders)
//get price greater than
ordersRouter.get("/orderPrice",adminRoleAuth, priceOrders);
