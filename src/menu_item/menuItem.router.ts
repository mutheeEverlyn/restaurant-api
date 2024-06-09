import { Hono } from "hono";
import { listMenuItem, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem } from "./menuItem.controller"
import { zValidator } from "@hono/zod-validator";
import { menuItemSchema } from "../validators";
export const menuItemRouter = new Hono();

//get all menuItems      /menuItem
menuItemRouter.get("/menuItem", listMenuItem);
//get a single menuItem    menuItem/1
menuItemRouter.get("/menuItem/:id", getMenuItem)
// create a menuItem 
menuItemRouter.post("/menuItem", createMenuItem)
//update a menuItem
menuItemRouter.put("/menuItem/:id", updateMenuItem)

menuItemRouter.delete("/menuItem/:id", deleteMenuItem)

