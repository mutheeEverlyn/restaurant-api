import { Hono } from "hono";
import { listOrderMenuItem, getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem,getOrderMenuItemData} from "./orderMenuitem.controller"
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const orderMenuItemRouter = new Hono();

//get all orderMenuitem      /orderMenuItem
orderMenuItemRouter.get("/orderMenuItem",adminRoleAuth, listOrderMenuItem);
//get a single orderMenuItem    /orderMenuItem/1
orderMenuItemRouter.get("/ordermenuItem/:id",userAdminRoleAuth, getOrderMenuItem)
// create an orderMenuItem
orderMenuItemRouter.post("/orderMenuItem",zValidator('json',orderMenuItemSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createOrderMenuItem)
//update a orderMenuItem
orderMenuItemRouter.put("/orderMenuItem/:id",adminRoleAuth, updateOrderMenuItem)

orderMenuItemRouter.delete("/orderMenuItem/:id", adminRoleAuth,deleteOrderMenuItem)
//get orderMenuItem with menuItem
orderMenuItemRouter.get("/orderMenuItemData",adminRoleAuth,getOrderMenuItemData );