
import env from "../config/env.js";

export const getCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: env.nodeEnv === "production" ? "none" : "lax",
  path: "/",
  maxAge,
});