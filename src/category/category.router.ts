import { Hono } from "hono";
import { listCategory, getCategory, createCategory, updateCategory, deleteCategory } from "./category.controller"
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";
export const categoryRouter = new Hono();

//get all category     /category
categoryRouter.get("/category", listCategory);
//get a single category    /category/1
categoryRouter.get("/category/:id", getCategory)
// create a category
categoryRouter.post("/category", createCategory)
//update a category
categoryRouter.put("/category/:id", updateCategory)

categoryRouter.delete("/category/:id", deleteCategory)

//https:domai.com/category?limit=10