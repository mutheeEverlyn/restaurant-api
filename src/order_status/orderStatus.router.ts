import { Hono } from "hono";
import { listOrderStatus, getOrderStatus, createOrderStatus, updateOrderStatus, deleteOrderStatus,getOrderStatusData } from "./orderStatus.controller"
import { zValidator } from "@hono/zod-validator";
import { orderStatusSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const orderStatusRouter = new Hono();

//get all orderStatus    orderStatus
orderStatusRouter.get("/orderStatus",adminRoleAuth,listOrderStatus);
//orderStatus data
orderStatusRouter.get("/orderStatusData",userAdminRoleAuth,getOrderStatusData);
//get a single orderStatus   orderStatus/1
orderStatusRouter.get("/orderStatus/:id",userAdminRoleAuth, getOrderStatus)
// create an orderStatus
orderStatusRouter.post("/orderStatus",zValidator('json',orderStatusSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createOrderStatus)
//update an orderStatus
orderStatusRouter.put("/orderStatus/:id",adminRoleAuth, updateOrderStatus)

orderStatusRouter.delete("/orderStatus/:id",adminRoleAuth, deleteOrderStatus)

