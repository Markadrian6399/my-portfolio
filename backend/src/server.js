import dotenv from "dotenv";
import { createApp } from "./app.js";
import { createPool, migrate } from "./db.js";
import { createMailer } from "./mailer.js";

dotenv.config({ quiet: true });

const required = (key) => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} must be set`);
  return value;
};

const adminToken = required("ADMIN_TOKEN");
if (adminToken.length < 24) throw new Error("ADMIN_TOKEN must be at least 24 characters");

const pool = createPool(required("DATABASE_URL"));
await migrate(pool);

const mailer = createMailer({
  apiKey: process.env.RESEND_API_KEY,
  to: process.env.CONTACT_TO,
  from: process.env.EMAIL_FROM,
});
console.log(
  mailer
    ? `contact messages will be emailed to ${mailer.to}`
    : "RESEND_API_KEY not set; contact messages are stored but not emailed"
);

const app = createApp({
  pool,
  mailer,
  adminToken,
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  trustProxy: process.env.TRUST_PROXY === "true",
});

const port = Number(process.env.PORT) || 8080;
const server = app.listen(port, () => console.log(`listening on port ${port}`));

const shutdown = () => {
  server.close(() => pool.end().then(() => process.exit(0)));
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
