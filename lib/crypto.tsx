"use server";
import crypto from "crypto";

export async function encrypt(text: string) {
  const { randomBytes, createCipheriv } = crypto;
  const key = process.env.ENCRYPT_SECRET!;
  const iv = randomBytes(16);

  const cipher = createCipheriv("aes256", key, iv);
  const encryptedText =
    cipher.update(text, "utf8", "hex") + cipher.final("hex");

  return `${iv.toString("hex")}:${encryptedText}`;
}

export async function decrypt(text: string) {
  const { createDecipheriv } = crypto;
  const key = process.env.ENCRYPTION_KEY!;
  const [ivHex, encryptedText] = text.split(":"); // Split the IV and encrypted data
  const iv = Buffer.from(ivHex, "hex");

  const decipher = createDecipheriv("aes256", key, iv);
  const decryptedText =
    decipher.update(encryptedText, "hex", "utf8") + decipher.final("utf8");
  return decryptedText;
}
