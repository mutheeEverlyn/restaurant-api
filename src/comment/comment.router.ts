import { Hono } from "hono";
import { listComment, getComment, createComment, updateComment, deleteComment,commentWithUsers } from "./comment.controller"
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const commentRouter = new Hono();

//get all comment     /comment
commentRouter.get("/comment",userAdminRoleAuth, listComment);
//get a single comment    /comment/1
commentRouter.get("/comment/:id",userAdminRoleAuth, getComment);
// create a comment
commentRouter.post("/comment",zValidator('json',commentSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),userRoleAuth ,createComment);
//update a comment
commentRouter.put("/comment/:id",userRoleAuth, updateComment);
commentRouter.delete("/comment/:id",adminRoleAuth, deleteComment);
//get all comment with users
commentRouter.get("/commentWithUsers",userAdminRoleAuth,commentWithUsers);

