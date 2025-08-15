import { db } from "@/lib/drizzle";
import { ResetPasswordTable } from "@/lib/drizzle/schema";
import { and, eq, gt } from "drizzle-orm";

export async function addToken(
  userId: number,
  hashedToken: string,
  expiresAt: Date
) {
  try {
    await db
      .insert(ResetPasswordTable)
      .values({
        userId: userId,
        token: hashedToken,
        expiresAt: expiresAt,
      })
      .onConflictDoUpdate({
        target: ResetPasswordTable.id,
        set: { token: hashedToken, expiresAt: expiresAt },
      });
  } catch (error) {
    return console.log(error);
  }
}

export async function checkToken(hashedToken: string) {
  try {
    const result = await db
      .select()
      .from(ResetPasswordTable)
      .where(
        and(
          eq(ResetPasswordTable.token, hashedToken),
          gt(ResetPasswordTable.expiresAt, new Date())
        )
      )
      .limit(1);
    return result;
  } catch (error) {
    return console.log(error);
  }
}

export async function deleteToken(hashedToken: string) {
  try {
    await db
      .delete(ResetPasswordTable)
      .where(eq(ResetPasswordTable.token, hashedToken));
  } catch (error) {
    console.log(error);
  }
}
