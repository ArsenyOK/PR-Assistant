import fs from "fs";
import jwt from "jsonwebtoken";

const appId = process.env.GITHUB_APP_ID!;
const privateKey = fs.readFileSync(
  process.env.GITHUB_PRIVATE_KEY_PATH!,
  "utf-8",
);

export function generateAppJwt() {
  const payload = {
    iat: Math.floor(Date.now() / 1000) - 60,
    exp: Math.floor(Date.now() / 1000) + 10 * 60,
    iss: appId,
  };

  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
}
