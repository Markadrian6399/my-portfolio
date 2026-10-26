import { badRequest } from "./errors.js";

/** Rejects empty or overly long text and returns it trimmed. */
export const requireText = (field, value, maxChars) => {
  const trimmed = typeof value === "string" ? value.trim() : "";
  if (!trimmed) throw badRequest(`${field} is required`);
  if ([...trimmed].length > maxChars) {
    throw badRequest(`${field} must be at most ${maxChars} characters`);
  }
  return trimmed;
};

/** Only allows http(s) links so stored URLs can't become `javascript:` hrefs. */
export const optionalUrl = (field, value) => {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string" || !/^https?:\/\//.test(value)) {
    throw badRequest(`${field} must start with http:// or https://`);
  }
  if (value.length > 500) throw badRequest(`${field} must be at most 500 characters`);
  return value;
};

export const integer = (field, value, { min, max, fallback } = {}) => {
  if ((value === undefined || value === null) && fallback !== undefined) return fallback;
  if (!Number.isInteger(value)) throw badRequest(`${field} must be a whole number`);
  if ((min !== undefined && value < min) || (max !== undefined && value > max)) {
    throw badRequest(`${field} must be between ${min} and ${max}`);
  }
  return value;
};

export const looksLikeEmail = (email) => {
  if (typeof email !== "string" || /\s/.test(email)) return false;
  const at = email.indexOf("@");
  if (at < 1 || at !== email.lastIndexOf("@")) return false;
  const domain = email.slice(at + 1);
  return domain.includes(".") && !domain.startsWith(".") && !domain.endsWith(".");
};
