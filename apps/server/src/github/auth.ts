import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

export const generateAppJwt = () => {
  const appId = process.env.GITHUB_APP_ID;
  const privateKeyPath = process.env.GITHUB_PRIVATE_KEY_PATH;

  if (!appId) {
    throw new Error("Missing GITHUB_APP_ID in environment variables");
  }

  if (!privateKeyPath) {
    throw new Error("Missing GITHUB_PRIVATE_KEY_PATH in environment variables");
  }

  const resolvedPath = path.resolve(process.cwd(), privateKeyPath);
  const privateKey = fs.readFileSync(resolvedPath, "utf-8");

  const payload = {
    iat: Math.floor(Date.now() / 1000) - 60,
    exp: Math.floor(Date.now() / 1000) + 10 * 60,
    iss: appId,
  };

  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
};
