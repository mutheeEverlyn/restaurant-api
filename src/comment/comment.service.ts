import { eq,sql} from "drizzle-orm";
import db from "../drizzle/db";
import {tableComment, tsComment,tiComment} from "../drizzle/schema"


export const commentService = async (limit?: number):Promise<tsComment[] | null>  => {
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
//commentsData

export const commentsData= async () => {
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
            },
            orders:{
                columns:{
                    actual_delivery_time:true,
                    final_price:true,
                    comment:true,
                     delivery_address_id:true,
                     discount:true
                }
            }
        }
    })
}

export const createCommentService = async (comment:any):Promise<string | null>  => {
    await db.insert(tableComment).values(comment)
    return "comment created successfully";
}

export const updateCommentService = async (id: number, comment: any):Promise<string | null> => {
    await db.update(tableComment).set(comment).where(eq(tableComment.id, id))
    return "comment updated successfully";
}

export const deleteCommentService = async (id: number):Promise<string | null> => {
    await db.delete(tableComment).where(eq(tableComment.id, id))
    return "comment deleted successfully";
}
