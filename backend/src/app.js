import cors from "cors";
import express from "express";
import { requireAdmin } from "./auth.js";
import { errorHandler, HttpError } from "./errors.js";
import { analyticsRoutes } from "./routes/analytics.js";
import { contactRoutes } from "./routes/contact.js";
import { contentRoutes } from "./routes/content.js";

export const createApp = ({ pool, mailer, adminToken, allowedOrigins, trustProxy }) => {
  const app = express();
  // Behind Render's proxy, read the real client IP (used for rate limiting).
  if (trustProxy) app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(express.json({ limit: "20kb" }));

  const admin = requireAdmin(adminToken);

  app.get("/health", (req, res) => res.send("ok"));
  app.use("/api", contentRoutes(pool, admin));
  app.use("/api", contactRoutes(pool, mailer, admin));
  app.use("/api", analyticsRoutes(pool, admin));

  app.use((req, res, next) => next(new HttpError(404, "not found")));
  app.use(errorHandler);
  return app;
};
