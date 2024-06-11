import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./user.controller"
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users",adminRoleAuth, listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id",userRoleAuth,userAdminRoleAuth, getUser);
// create a user 
userRouter.post("/users",userRoleAuth,userAdminRoleAuth, createUser);
//update a user
userRouter.put("/users/:id",adminRoleAuth, updateUser);

userRouter.delete("/users/:id",adminRoleAuth, deleteUser);

//https:domai.com/api/users?limit=10