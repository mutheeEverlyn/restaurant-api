import { AuthOnTableUsers, TIAuthOnUser, TSAuthOnUser } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuthOnUser): Promise<string | null> => {
    await db.insert(AuthOnTableUsers).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthOnUser) => {
    const { email, password } = user;
    return await db.query.AuthOnTableUsers.findFirst({
        columns: {
            email: true,
            role: true,
            password: true
            
        }, where: sql` ${AuthOnTableUsers.email} = ${email}`,
        with: {
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    phone_verified:true,
                    email: true,
                    email_verified:true,
                    confirmation_code:true,
                    id: true
                }
            }
        }
    })
}

export const emailByUserId = async (id: number): Promise<string | null> => {
    const result = await db.query.tableUsers.findFirst({
      columns: {
        email: true,
      },
      where: (tableUsers, { eq }) => eq(tableUsers.id, id),
    });
  
    if (!result) {
      return null;
    }
  
    return result.email;
  };