import { db } from "@/lib/drizzle";
import { UsersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { DateTime } from "luxon";

export async function checkEmailUser(email: string) {
  const result = await db
    .select({
      id: UsersTable.id,
      email: UsersTable.email,
      password: UsersTable.password,
    })
    .from(UsersTable)
    .where(eq(UsersTable.email, email))
    .limit(1);
  return result[0];
}

export async function findUser(id: number) {
  const result = await db
    .select({
      id: UsersTable.id,
      username: UsersTable.username,
      email: UsersTable.email,
      password: UsersTable.password,
      role: UsersTable.role,
    })
    .from(UsersTable)
    .where(eq(UsersTable.id, id))
    .limit(1);
  return result[0];
}

export async function changePassword(userId: number, hashedPassword: string) {
  await db
    .update(UsersTable)
    .set({
      password: hashedPassword,
      updatedAt: DateTime.utc().toJSDate(),
    })
    .where(eq(UsersTable.id, userId));
}
