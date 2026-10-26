// Sends Resend's "Hello World" test email. Reads RESEND_API_KEY and CONTACT_TO
// from backend/.env:  npm run send-test-email
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config({ quiet: true });

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: process.env.CONTACT_TO || "markodiba6399@gmail.com",
  subject: "Hello World",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});

if (error) {
  console.error("failed:", error);
  process.exit(1);
}
console.log("sent:", data);
