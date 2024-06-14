import { Hono } from "hono";
import { listAddress, getAddress, createAddress, updateAddress, deleteAddress,limit,getAddressData } from "./address.controller"
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";
import { adminRoleAuth,userRoleAuth,userAdminRoleAuth} from "../middleware/bearAuth";
export const addressRouter = new Hono();

//get all Address     /address
addressRouter.get("/address",adminRoleAuth, listAddress);
//get a single address      /address/1
addressRouter.get("/address/:id",userAdminRoleAuth, getAddress)
// create a address
addressRouter.post("/address",zValidator('json',addressSchema,(result,c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),adminRoleAuth, createAddress)
//update a address
addressRouter.put("/address/:id", adminRoleAuth,updateAddress)

addressRouter.delete("/address/:id",adminRoleAuth, deleteAddress)

//https:domai.com/address?limit=10
addressRouter.get("/limitAddress",userAdminRoleAuth, limit);
//address data
addressRouter.get("/addressData",adminRoleAuth, getAddressData );