"server only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { DateTime } from "luxon";
// import { findUser } from "../queries/user";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: number) {
  const expiresAt = DateTime.utc().plus({ days: 3 }).toJSDate(); //3 days

  const session = await encryptSession({
    userId,
    expiresAt,
  });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export async function encryptSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(encodedKey);
}

export async function decryptSession(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return {
      userId: payload.userId as number,
      expiresAt: new Date(payload.expiresAt as string),
    };
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}
