"use server";

import { z } from "zod";
import {
  createSession,
  decryptSession,
  deleteSession,
} from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { changePassword, checkEmailUser, findUser } from "../queries/user";
import { cookies } from "next/headers";
import { checkPassword, hashPassword } from "./encryption/bcrypt";
import { createHash, randomBytes } from "crypto";
import { addToken, checkToken, deleteToken } from "../queries/resetPassword";
import { createTransporter } from "../nodemailer/nodemailer";

// const testUser = {
//   id: "1",
//   email: "contact@cosdensolutions.io",
//   password: "12345678",
// };

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = await decryptSession(cookieStore.get("session")?.value);
  if (!session) return null;

  const user = await findUser(session.userId);
  if (!user) return null;

  return user;
}

// Login actions
//-------------------------------------------------------------------------
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
  const user = await checkEmailUser(email);
  if (!user) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }
  const isPasswordExist = await checkPassword(password, user.password);
  if (email !== user.email || isPasswordExist === false) {
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

// Forgot password actions
//---------------------------------------------------------------------------
const resetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
});
type ResetState =
  | { errors: { email?: string[] }; message?: string }
  | undefined;

export async function requestPasswordReset(
  prevState: LoginState,
  formData: FormData
): Promise<ResetState> {
  const result = resetSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email } = result.data;
  const user = await checkEmailUser(email);
  // Always return success to avoid email enumeration
  if (!user) return { errors: { email: ["Link Password sudah dikirim!"] } };

  // Generate token
  const rawToken = randomBytes(32).toString("hex");
  const hashedToken = createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 15); //15 minutes
  await addToken(user.id, hashedToken, expiresAt);

  //send SMTP email
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${rawToken}`;

  const transporter = await createTransporter();
  await transporter.sendMail({
    from: `"Support" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Password Reset",
    html: `<p><a href="${resetLink}">Klik disini</a> untuk reset password. Link ini akan nonaktif dalam 15 menit.</p>`,
  });

  return { errors: { email: ["Link Password sudah dikirim!"] } };
}

export async function resetPassword(rawToken: string, newPassword: string) {
  // Hash incoming token for comparison
  const hashedToken = createHash("sha256").update(rawToken).digest("hex");

  const token = await checkToken(hashedToken);
  if (!token) return { success: false, message: "Invalid or expired token" };

  const hashedPassword = await hashPassword(newPassword);
  await changePassword(token[0].userId, hashedPassword);
  await deleteToken(hashedPassword);

  return { success: true };
}
