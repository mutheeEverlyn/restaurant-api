import { Hono } from "hono";
import { listAddress, getAddress, createAddress, updateAddress, deleteAddress } from "./address.controller"
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";
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