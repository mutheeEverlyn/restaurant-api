import { eq,sql} from "drizzle-orm";
import db from "../drizzle/db";
import {tableComment, tsComment,tiComment} from "../drizzle/schema"


export const commentService = async (limit?: number):Promise<tsComment[] | unknown>  => {
    if (limit) {
        return await db.query.tableComment.findMany({
            limit: limit
        });
    }
    return await db.query.tableComment.findMany();
}

export const getCommentService = async (id: number):Promise<tsComment[] | unknown>  => {
    return await db.query.tableComment.findFirst({
        where: eq(tableComment.id, id)
    })
}
//userWithComment

export const userWithComment= async ():Promise<tsComment[] | unknown>  => {
    return await db.query.tableComment.findMany({
        columns:{
           is_complaint:true,
           is_praise:true,
           user_id:true
        },with:{
            users:{
                columns:{
                    name:true
                }
            }
        }
    })
}

export const createCommentService = async (comment:any):Promise<tiComment[] | unknown>  => {
    await db.insert(tableComment).values(comment)
    return "comment created successfully";
}

export const updateCommentService = async (id: number, comment: any):Promise<tiComment[] | unknown>  => {
    await db.update(tableComment).set(comment).where(eq(tableComment.id, id))
    return "comment updated successfully";
}

export const deleteCommentService = async (id: number):Promise<string | null>  => {
    await db.delete(tableComment).where(eq(tableComment.id, id))
    return "comment deleted successfully";
}
