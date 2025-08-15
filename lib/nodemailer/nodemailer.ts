// nodemailer.ts
import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;
const REDIRECT_URI = process.env.REDIRECT_URI!;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token || "",
    },
  });
}
