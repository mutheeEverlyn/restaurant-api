import { Hono } from "hono";
import { listCategory, getCategory, createCategory, updateCategory, deleteCategory, getCategoryData  } from "./category.controller"
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const categoryRouter = new Hono();

//get all category     /category
categoryRouter.get("/category",userAdminRoleAuth, listCategory);
//get a single category    /category/1
categoryRouter.get("/category/:id",userAdminRoleAuth, getCategory)
// create a category
categoryRouter.post("/category",zValidator('json',categorySchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createCategory)
//update a category
categoryRouter.put("/category/:id",adminRoleAuth, updateCategory)

categoryRouter.delete("/category/:id",adminRoleAuth, deleteCategory)
//update a category
categoryRouter.get("/categoryData",adminRoleAuth,getCategoryData )
