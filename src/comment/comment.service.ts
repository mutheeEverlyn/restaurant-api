import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {tableComment} from "../drizzle/schema"


export const commentService = async (limit?: number) => {
    if (limit) {
        return await db.query.tableComment.findMany({
            limit: limit
        });
    }
    return await db.query.tableComment.findMany();
}

export const getCommentService = async (id: number) => {
    return await db.query.tableComment.findFirst({
        where: eq(tableComment.id, id)
    })
}

export const createCommentService = async (comment:any) => {
    await db.insert(tableComment).values(comment)
    return "comment created successfully";
}

export const updateCommentService = async (id: number, comment: any) => {
    await db.update(tableComment).set(comment).where(eq(tableComment.id, id))
    return "comment updated successfully";
}

export const deleteCommentService = async (id: number) => {
    await db.delete(tableComment).where(eq(tableComment.id, id))
    return "comment deleted successfully";
}
