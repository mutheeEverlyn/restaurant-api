import { Hono } from "hono";
import { listMenuItem, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem,getMenuItemData } from "./menuItem.controller"
import { zValidator } from "@hono/zod-validator";
import { menuItemSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
import { get } from "http";
export const menuItemRouter = new Hono();

//get all menuItems      /menuItem
menuItemRouter.get("/menuItem",userAdminRoleAuth, listMenuItem);
//get menuItemData
menuItemRouter.get("/menuItemData",adminRoleAuth, getMenuItemData);
//get a single menuItem    menuItem/1
menuItemRouter.get("/menuItem/:id",userAdminRoleAuth, getMenuItem)
// create a menuItem 
menuItemRouter.post("/menuItem",zValidator('json',menuItemSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createMenuItem)
//update a menuItem
menuItemRouter.put("/menuItem/:id",adminRoleAuth, updateMenuItem)

menuItemRouter.delete("/menuItem/:id",adminRoleAuth, deleteMenuItem)

