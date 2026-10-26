import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { badRequest, HttpError } from "../errors.js";
import { looksLikeEmail, requireText } from "../validate.js";

export const contactRoutes = (pool, mailer, admin) => {
  const router = Router();

  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (req, res, next) =>
      next(new HttpError(429, "too many requests, try again later")),
  });

  router.post("/contact", async (req, res) => {
    const body = req.body || {};
    // Honeypot: hidden in the form, so only bots fill it in. Pretend it worked.
    if (body.website) return res.status(201).json({ ok: true });

    const name = requireText("name", body.name, 100);
    const message = requireText("message", body.message, 5000);
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (email.length > 254 || !looksLikeEmail(email)) {
      throw badRequest("a valid email is required");
    }

    // Only count valid submissions against the limit.
    await new Promise((resolve, reject) =>
      limiter(req, res, (err) => (err ? reject(err) : resolve()))
    );

    await pool.query("INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)", [
      name,
      email,
      message,
    ]);

    if (mailer) {
      mailer
        .sendContactNotification({ name, email, message })
        .catch((err) => console.warn("failed to send contact notification:", err.message));
    }

    res.status(201).json({ ok: true });
  });

  router.get("/messages", admin, async (req, res) => {
    const { rows } = await pool.query(
      `SELECT id::int AS id, name, email, message, created_at AS "createdAt"
       FROM messages ORDER BY created_at DESC LIMIT 100`
    );
    res.json(rows);
  });

  return router;
};
