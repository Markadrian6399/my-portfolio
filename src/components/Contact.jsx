import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Send } from "lucide-react";
import { toast } from "react-toastify";
import SectionLabel from "./SectionLabel";
import { API_URL, sendContact } from "../lib/api";

const Contact = () => {
  const form = useRef();
  const btn = useRef();
  const [loading, SetLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    SetLoading("Sending...");
    btn.current.disabled = true;
    try {
      if (API_URL) {
        const fields = new FormData(form.current);
        await sendContact({
          name: fields.get("from_name"),
          email: fields.get("reply_to"),
          message: fields.get("message"),
          website: fields.get("website"),
        });
      } else {
        await emailjs.sendForm(
          "service_25w4cla",
          "template_qprrztq",
          form.current,
          "Z7N6Vq2E2V9j0HbJg"
        );
      }
      SetLoading("Sent!");
      toast.success("Message sent! I'll get back to you soon.");
      form.current.reset();
    } catch (error) {
      SetLoading("Try again");
      toast.error(
        error.message && API_URL
          ? error.message
          : "Something went wrong. Please check your connection and try again."
      );
    } finally {
      btn.current.disabled = false;
      setTimeout(() => SetLoading(false), 3000);
    }
  };

  const inputClass =
    "w-full h-14 rounded-2xl bg-input border border-border px-5 text-base text-foreground placeholder:text-mutedForeground focus:border-accent focus:outline-none transition-colors duration-150";

  return (
    <div>
      <SectionLabel icon={Send}>Contact</SectionLabel>
      <h2 className="mt-8 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground/80 md:text-4xl">
        If you have a project in mind or just want to chat, drop me an email or
        fill in the form. <span className="text-accent">Available now.</span>
      </h2>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="mailto:markodiba6399@gmail.com"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground/80 transition-colors duration-150 hover:border-accent hover:text-accent"
        >
          <Mail size={16} strokeWidth={1.5} />
          markodiba6399@gmail.com
        </a>
        <a
          href="https://wa.me/2349029121639"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground/80 transition-colors duration-150 hover:border-accent hover:text-accent"
        >
          <FaWhatsapp size={16} />
          WhatsApp me
        </a>
      </div>

      <form ref={form} onSubmit={sendEmail} className="mt-12 grid gap-4 sm:grid-cols-2">
        <input type="text" name="from_name" placeholder="Your name" required className={inputClass} />
        <input type="email" name="reply_to" placeholder="Your email" required className={inputClass} />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <textarea
          name="message"
          rows="6"
          placeholder="Your message"
          required
          className={`${inputClass} h-auto resize-y py-4 sm:col-span-2`}
        />
        <div>
          <button
            type="submit"
            ref={btn}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accentForeground transition-opacity duration-150 hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading || "Send Message"}
            <Send size={15} />
          </button>
        </div>
      </form>

      <footer className="mt-28 border-t border-border pt-8 text-sm text-mutedForeground">
        © {new Date().getFullYear()} Mark Odiba. Designed & built by Mark Odiba.
      </footer>
    </div>
  );
};

export default Contact;
