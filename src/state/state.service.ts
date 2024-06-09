import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableState} from "../drizzle/schema"


export const stateService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableState.findMany({
            limit: limit
        });
    }
    return await db.query.tableState.findMany();
}

export const getStateService = async (id: number) => {
    return await db.query.tableState.findFirst({
        where: eq(tableState.id, id)
    })
}

export const createStateService = async (state:any) => {
    await db.insert(tableState).values(state)
    return "state created successfully";
}

export const updateStateService = async (id: number, state: any) => {
    await db.update(tableState).set(state).where(eq(tableState.id, id))
    return "state updated successfully";
}

export const deleteStateService = async (id: number) => {
    await db.delete(tableState).where(eq(tableState.id, id))
    return "state deleted successfully";
}
