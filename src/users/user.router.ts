import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser,emailVerifiedTrue } from "./user.controller"
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users",adminRoleAuth, listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id",userAdminRoleAuth, getUser); 
//get email verified
userRouter.get("/emailVerifiedTrue",adminRoleAuth,emailVerifiedTrue);
// create a user 
userRouter.post("/users",zValidator('json',userSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), adminRoleAuth,createUser);  
//update a user
userRouter.put("/users/:id",adminRoleAuth, updateUser);

userRouter.delete("/users/:id",adminRoleAuth, deleteUser);
