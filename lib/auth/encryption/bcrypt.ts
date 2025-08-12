"use server";
import bcrypt from "bcrypt";

const saltRounds = 12;
const { genSalt, hash, compare } = bcrypt;

export async function hashPassword(plainTextPassword: string) {
  const salt = await genSalt(saltRounds);
  const hashed = await hash(plainTextPassword, salt);
  return hashed;
}

export async function checkPassword(
  plainTextPassword: string,
  hashedPassword: string
) {
  const result = await compare(plainTextPassword, hashedPassword);
  return result;
}
