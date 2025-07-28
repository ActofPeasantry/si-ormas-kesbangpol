"use server";

import { z } from "zod";
import {
  createSession,
  decryptSession,
  deleteSession,
} from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { checkLoginUser, findUser } from "../queries/user";
import { decrypt } from "@/lib/crypto";
import { cookies } from "next/headers";

// const testUser = {
//   id: "1",
//   email: "contact@cosdensolutions.io",
//   password: "12345678",
// };

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

type LoginState =
  | { errors: { email?: string[]; password?: string[] }; message?: string }
  | undefined;

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  const user = await checkLoginUser(email);
  const decryptedPassword = await decrypt(user.password);

  if (email !== user.email || password !== decryptedPassword) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = await decryptSession(cookieStore.get("session")?.value);
  if (!session) return null;

  const user = await findUser(session.userId);
  if (!user) return null;

  return user;
}
