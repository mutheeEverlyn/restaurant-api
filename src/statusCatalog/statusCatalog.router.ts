import { Hono } from "hono";
import { listStatusCatalog, getStatusCatalog, createStatusCatalog, updateStatusCatalog, deleteStatusCatalog} from "./statusCatalog.controller"
import { zValidator } from "@hono/zod-validator";
import { statusCatalogSchema } from "../validators";
export const statusCatalogRouter = new Hono();

//get all StatusCatalog   / statusCatalog
statusCatalogRouter.get("/statusCatalog", listStatusCatalog);
//get a single StatusCatalog    /StatusCatalog/1
statusCatalogRouter.get("/statusCatalog/:id", getStatusCatalog)
// create a StatusCatalog
statusCatalogRouter.post("/statusCatalog", createStatusCatalog)
//update a StatusCatalog
statusCatalogRouter.put("/statusCatalog/:id", updateStatusCatalog)

statusCatalogRouter.delete("/statusCatalog/:id", deleteStatusCatalog)

//https:domai.com/statusCatalog?limit=10