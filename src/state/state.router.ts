import { Hono } from "hono";
import { listState, getState, createState, updateState, deleteState} from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
export const stateRouter = new Hono();

//get all states    / state
stateRouter.get("/state", listState);
//get a single state    /state/1
stateRouter.get("/state/:id", getState)
// create a state
stateRouter.post("/state", createState)
//update a state
stateRouter.put("/state/:id", updateState)

stateRouter.delete("/state/:id", deleteState)

//https:domai.com/state?limit=10