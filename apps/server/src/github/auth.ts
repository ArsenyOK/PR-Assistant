import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export const generateAppJwt = () => {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!appId) {
    throw new Error("Missing GITHUB_APP_ID in environment variables");
  }

  if (!privateKey) {
    throw new Error("Missing GITHUB_PRIVATE_KEY in environment variables");
  }

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iat: now - 60,
    exp: now + 9 * 60,
    iss: appId,
  };

  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
};
