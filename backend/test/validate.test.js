import assert from "node:assert/strict";
import { test } from "node:test";
import { integer, looksLikeEmail, optionalUrl, requireText } from "../src/validate.js";

test("looksLikeEmail", () => {
  assert.ok(looksLikeEmail("mark@example.com"));
  assert.ok(!looksLikeEmail("mark@example"));
  assert.ok(!looksLikeEmail("@example.com"));
  assert.ok(!looksLikeEmail("mark @example.com"));
  assert.ok(!looksLikeEmail("mark.example.com"));
});

test("optionalUrl rejects non-http links", () => {
  assert.equal(optionalUrl("liveUrl", undefined), null);
  assert.equal(optionalUrl("liveUrl", "https://a.dev"), "https://a.dev");
  assert.throws(() => optionalUrl("liveUrl", "javascript:alert(1)"), /must start with/);
});

test("requireText trims and enforces limits", () => {
  assert.equal(requireText("name", "  Mark  ", 10), "Mark");
  assert.throws(() => requireText("name", "   ", 10), /is required/);
  assert.throws(() => requireText("name", "x".repeat(11), 10), /at most 10/);
});

test("integer bounds and fallback", () => {
  assert.equal(integer("sortOrder", undefined, { fallback: 0 }), 0);
  assert.equal(integer("percent", 70, { min: 0, max: 100 }), 70);
  assert.throws(() => integer("percent", 101, { min: 0, max: 100 }), /between 0 and 100/);
  assert.throws(() => integer("percent", "70", { min: 0, max: 100 }), /whole number/);
});
