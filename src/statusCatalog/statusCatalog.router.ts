import { Hono } from "hono";
import { listStatusCatalog, getStatusCatalog, createStatusCatalog, updateStatusCatalog, deleteStatusCatalog,statusCatalog} from "./statusCatalog.controller"
import { zValidator } from "@hono/zod-validator";
import { statusCatalogSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const statusCatalogRouter = new Hono();

//get all StatusCatalog   / statusCatalog
statusCatalogRouter.get("/statusCatalog", adminRoleAuth, listStatusCatalog);
//get a single StatusCatalog    /StatusCatalog/1
statusCatalogRouter.get("/statusCatalog/:id",adminRoleAuth, getStatusCatalog);
// create a StatusCatalog
statusCatalogRouter.post("/statusCatalog",zValidator('json',statusCatalogSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createStatusCatalog);
//update a StatusCatalog
statusCatalogRouter.put("/statusCatalog/:id",adminRoleAuth, updateStatusCatalog);

statusCatalogRouter.delete("/statusCatalog/:id",adminRoleAuth, deleteStatusCatalog);
//with
statusCatalogRouter.get("/withStatusCatalog", adminRoleAuth, statusCatalog);