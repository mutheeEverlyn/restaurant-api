import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableState, tsState,tiState} from "../drizzle/schema"


export const stateService = async (limit?: number):Promise<tsState[] | null> => {
    if (limit) {
        return await db.query.tableState.findMany({
            limit: limit
        });
    }
    return await db.query.tableState.findMany();
}

export const getStateService = async (id: number):Promise<tsState[] | unknown> => {
    return await db.query.tableState.findFirst({
        where: eq(tableState.id, id)
    })
}
//with columns
export const stateWithColums = async ():Promise<tsState[] | unknown> => {
    return await db.query.tableState.findMany({
        columns:{
            id:true,
            name:true
        },
       with:{
        city:true
       }
    });
}
export const createStateService = async (state:any):Promise<tiState[] | unknown> => {
    await db.insert(tableState).values(state)
    return "state created successfully";
}

export const updateStateService = async (id: number, state: any):Promise<tiState[] | unknown>=> {
    await db.update(tableState).set(state).where(eq(tableState.id, id))
    return "state updated successfully";
}

export const deleteStateService = async (id: number):Promise<string | null> => {
    await db.delete(tableState).where(eq(tableState.id, id))
    return "state deleted successfully";
}
