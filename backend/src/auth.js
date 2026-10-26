import { createHash, timingSafeEqual } from "node:crypto";
import { HttpError } from "./errors.js";

const digest = (value) => createHash("sha256").update(value).digest();

/** Allows the request only with `Authorization: Bearer <ADMIN_TOKEN>`. */
export const requireAdmin = (adminToken) => {
  const expected = digest(adminToken);
  return (req, res, next) => {
    const header = req.get("authorization") || "";
    const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
    // Hashing first gives equal-length buffers, so the comparison is constant-time.
    if (provided && timingSafeEqual(digest(provided), expected)) return next();
    next(new HttpError(401, "unauthorized"));
  };
};
