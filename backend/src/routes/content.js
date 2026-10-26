import { Router } from "express";
import { HttpError } from "../errors.js";
import { integer, optionalUrl, requireText } from "../validate.js";

const text = (key, column, max) => ({ key, column, parse: (v) => requireText(key, v, max) });
const url = (key, column) => ({ key, column, parse: (v) => optionalUrl(key, v) });
const sortOrder = { key: "sortOrder", column: "sort_order", parse: (v) => integer("sortOrder", v, { fallback: 0 }) };

const resources = {
  projects: {
    table: "projects",
    fields: [text("title", "title", 100), text("tag", "tag", 50), url("liveUrl", "live_url"), url("codeUrl", "code_url"), sortOrder],
  },
  skills: {
    table: "skills",
    fields: [
      text("name", "name", 50),
      text("detail", "detail", 100),
      text("icon", "icon", 30),
      { key: "percent", column: "percent", parse: (v) => integer("percent", v, { min: 0, max: 100 }) },
      sortOrder,
    ],
  },
  experience: {
    table: "experiences",
    fields: [
      text("role", "role", 100),
      text("company", "company", 100),
      text("period", "period", 50),
      text("description", "description", 1000),
      sortOrder,
    ],
  },
};

const parseId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) throw new HttpError(404, "not found");
  return id;
};

/** Public GET plus admin-only POST/PUT/DELETE for one content table. */
const resourceRouter = ({ table, fields }, pool, admin) => {
  const router = Router();
  // Columns come from the fixed config above, never from user input.
  const select = ["id", ...fields.map((f) => `${f.column} AS "${f.key}"`)].join(", ");
  const columns = fields.map((f) => f.column);
  const parseBody = (body = {}) => fields.map((f) => f.parse(body[f.key]));

  router.get("/", async (req, res) => {
    const { rows } = await pool.query(`SELECT ${select} FROM ${table} ORDER BY sort_order, id`);
    res.json(rows);
  });

  router.post("/", admin, async (req, res) => {
    const values = parseBody(req.body);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
    const { rows } = await pool.query(
      `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders}) RETURNING ${select}`,
      values
    );
    res.status(201).json(rows[0]);
  });

  router.put("/:id", admin, async (req, res) => {
    const id = parseId(req.params.id);
    const values = parseBody(req.body);
    const assignments = columns.map((c, i) => `${c} = $${i + 2}`).join(", ");
    const { rows } = await pool.query(
      `UPDATE ${table} SET ${assignments} WHERE id = $1 RETURNING ${select}`,
      [id, ...values]
    );
    if (!rows.length) throw new HttpError(404, "not found");
    res.json(rows[0]);
  });

  router.delete("/:id", admin, async (req, res) => {
    const id = parseId(req.params.id);
    const { rowCount } = await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    if (!rowCount) throw new HttpError(404, "not found");
    res.status(204).end();
  });

  return router;
};

export const contentRoutes = (pool, admin) => {
  const router = Router();
  for (const [name, resource] of Object.entries(resources)) {
    router.use(`/${name}`, resourceRouter(resource, pool, admin));
  }
  return router;
};
