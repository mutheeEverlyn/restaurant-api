import { Context } from "hono";
import { commentService, getCommentService, createCommentService, updateCommentService, deleteCommentService } from "./comment.service";

export const listComment = async (c: Context) => {
    try {
        //limit the number of comments to be returned

        const limit = Number(c.req.query('limit'))

        const data = await commentService(limit);
        if (data == null || data.length == 0) {
            return c.text("comment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getComment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await getCommentService(id);
    if (comment == undefined) {
        return c.text("comment not found", 404);
    }
    return c.json(comment, 200);
}
export const createComment = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const createdComment= await createCommentService(comment);


        if (!createdComment) return c.text("Comment not created", 404);
        return c.json({ msg: createdComment}, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateComment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await c.req.json();
    try {
        // search for the comment
        const searchedComment = await getCommentService(id);
        if (searchedComment == undefined) return c.text("comment not found", 404);
        // get the data and update it
        const res = await updateCommentService(id, comment);
        // return a success message
        if (!res) return c.text("comment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteComment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the comment
        const comment = await getCommentService(id);
        if (comment == undefined) return c.text("comment not found", 404);
        //deleting the comment
        const res = await deleteCommentService(id);
        if (!res) return c.text("comment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}