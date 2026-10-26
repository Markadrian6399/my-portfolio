import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { badRequest } from "../errors.js";

const KINDS = ["page_view", "cv_download", "project_click"];

export const analyticsRoutes = (pool, admin) => {
  const router = Router();

  // Over the limit: drop silently, analytics shouldn't surface errors to visitors.
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 120,
    legacyHeaders: false,
    handler: (req, res) => res.status(204).end(),
  });

  router.post("/events", limiter, async (req, res) => {
    const { kind, target } = req.body || {};
    if (!KINDS.includes(kind)) throw badRequest("unknown event kind");
    if (target !== undefined && target !== null) {
      if (typeof target !== "string" || [...target].length > 200) {
        throw badRequest("target must be text of at most 200 characters");
      }
    }
    await pool.query("INSERT INTO events (kind, target) VALUES ($1, $2)", [kind, target ?? null]);
    res.status(204).end();
  });

  router.get("/stats", admin, async (req, res) => {
    const [totals, daily, top, messages] = await Promise.all([
      pool.query(`SELECT kind,
                         COUNT(*)::int AS total,
                         (COUNT(*) FILTER (WHERE created_at > now() - interval '30 days'))::int AS "last30Days"
                  FROM events GROUP BY kind ORDER BY kind`),
      pool.query(`SELECT to_char(created_at::date, 'YYYY-MM-DD') AS day, COUNT(*)::int AS views
                  FROM events
                  WHERE kind = 'page_view' AND created_at > now() - interval '30 days'
                  GROUP BY 1 ORDER BY 1`),
      pool.query(`SELECT target, COUNT(*)::int AS clicks
                  FROM events
                  WHERE kind = 'project_click' AND target IS NOT NULL
                  GROUP BY target ORDER BY clicks DESC LIMIT 10`),
      pool.query("SELECT COUNT(*)::int AS count FROM messages"),
    ]);

    res.json({
      totals: totals.rows,
      dailyPageViews: daily.rows,
      topProjects: top.rows,
      messages: messages.rows[0].count,
    });
  });

  return router;
};
