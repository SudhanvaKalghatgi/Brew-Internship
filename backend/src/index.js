import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

connectDB();

const server = app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});