import { Hono } from "hono";
import { listComment, getComment, createComment, updateComment, deleteComment } from "./comment.controller"
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators";
export const commentRouter = new Hono();

//get all comment     /comment
commentRouter.get("/comment", listComment);
//get a single comment    /comment/1
commentRouter.get("/comment/:id", getComment)
// create a comment
commentRouter.post("/comment", createComment)
//update a comment
commentRouter.put("/comment/:id", updateComment)

commentRouter.delete("/comment/:id", deleteComment)

//https:domai.com/comment?limit=10