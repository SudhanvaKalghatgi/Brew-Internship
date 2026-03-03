
import env from "../config/env.js";

export const getCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: env.nodeEnv === "production" ? "strict" : "lax",
  path: "/",
  maxAge,
});