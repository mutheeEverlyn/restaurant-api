import { Hono } from "hono";
import { listAddress, getAddress, createAddress, updateAddress, deleteAddress,limit } from "./address.controller"
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";
import { limitAddress } from "./address.service";
export const addressRouter = new Hono();

//get all Address     /address
addressRouter.get("/address", listAddress);
//get a single address      /address/1
addressRouter.get("/address/:id", getAddress)
// create a address
addressRouter.post("/address", createAddress)
//update a address
addressRouter.put("/address/:id", updateAddress)

addressRouter.delete("/address/:id", deleteAddress)

//https:domai.com/address?limit=10
addressRouter.get("/limitAddress", limit);