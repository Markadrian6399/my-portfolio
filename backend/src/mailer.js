import { Resend } from "resend";

/**
 * Emails contact messages through Resend's HTTPS API (SMTP ports are blocked
 * on many free hosts, including Render). Returns null when RESEND_API_KEY is unset.
 */
export const createMailer = ({ apiKey, to, from }) => {
  if (!apiKey) return null;
  if (!to) throw new Error("CONTACT_TO must be set when RESEND_API_KEY is set");
  const resend = new Resend(apiKey);

  return {
    to,
    async sendContactNotification({ name, email, message }) {
      const { error } = await resend.emails.send({
        // Resend's shared sender needs no verified domain, but only delivers
        // to the address that owns the Resend account.
        from: from || "Portfolio <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      if (error) throw new Error(`Resend error: ${error.message}`);
    },
  };
};
