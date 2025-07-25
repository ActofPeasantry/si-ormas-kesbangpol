import { db } from "@/lib/db";
import { UsersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function findUser(email: string) {
  const result = await db
    .select({
      id: UsersTable.id,
      username: UsersTable.username,
      email: UsersTable.email,
      password: UsersTable.password,
      role: UsersTable.role,
    })
    .from(UsersTable)
    .where(eq(UsersTable.email, email))
    .limit(1);
  return result[0];
}
