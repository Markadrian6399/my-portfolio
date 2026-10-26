export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export const badRequest = (message) => new HttpError(400, message);

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  // Malformed JSON body from express.json()
  if (err.type === "entity.parse.failed" || err.type === "entity.too.large") {
    return res.status(err.status || 400).json({ error: "invalid request body" });
  }
  console.error("internal error:", err);
  res.status(500).json({ error: "internal server error" });
};
