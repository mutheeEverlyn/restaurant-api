import { Hono } from "hono";
import { listState, getState, createState, updateState, deleteState,stateColumns} from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const stateRouter = new Hono();

//get all states    / state
stateRouter.get("/state",userAdminRoleAuth, listState);
//get a single state    /state/1
stateRouter.get("/state/:id",userAdminRoleAuth, getState);
// create a state
stateRouter.post("/state",zValidator('json',stateSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createState);
//update a state
stateRouter.put("/state/:id",adminRoleAuth, updateState);

stateRouter.delete("/state/:id",adminRoleAuth, deleteState);
//get state columns
stateRouter.get("/stateWithColumns",userAdminRoleAuth, stateColumns);
