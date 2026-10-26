import { useEffect, useState } from "react";

// Unset means "no backend": content falls back to the built-in data,
// analytics is skipped, and the contact form uses EmailJS.
export const API_URL = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

export const useApi = (path, fallback) => {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    if (!API_URL) return;
    const controller = new AbortController();
    fetch(`${API_URL}${path}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((rows) => {
        if (Array.isArray(rows) && rows.length) setData(rows);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [path]);

  return data;
};

export const trackEvent = (kind, target) => {
  if (!API_URL) return;
  fetch(`${API_URL}/api/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, target }),
    keepalive: true,
  }).catch(() => {});
};

export const sendContact = async (fields) => {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
};
