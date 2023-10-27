import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Contact = () => {
  const theme = useSelector((state) => state.theme.value);
  const form = useRef();
  const btn = useRef();
  const [loading, SetLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    SetLoading("Sending......");
    btn.current.disabled = true;
    try {
      const res = await emailjs.sendForm(
        "service_25w4cla",
        "template_qprrztq",
        form.current,
        "Z7N6Vq2E2V9j0HbJg"
      );
      if (res) {
        SetLoading("Sent");
        btn.current.disabled = false;
      } else {
        SetLoading("Try again");
        toast.error("Pls check internet connection");
      }
    } catch (error) {
      if (error.status === 0) {
        toast.error("Pls check internet connection");
        btn.current.disabled = false;
      }
      if (!error) {
        SetLoading("Try again");
        toast.error("Pls check internet connection");
      }
    }

    // console.log(res.status);
  };
  const style = {
    button:
      theme === "dark"
        ? {
            background: "transparent",
            color: "white",
            border: "1px solid white",
          }
        : {
            background: "transparent",
            color: "#333",
            border: "1px solid lime",
          },
  };

  return (
    <section className="contact">
      <h1>Grab A Coffee & Feel Free To Chat With Me</h1>
      <a href="mailto:markodiba6399@gmail.com" className="card email">
        <FaEnvelope /> markodiba6399@gmail.com
      </a>
      <a href="https://wa.me/09029121639" className="card email">
        <FaWhatsapp /> Send me a whatsapp message
      </a>

      <form ref={form} onSubmit={sendEmail}>
        <div className="form-control">
          <input
            type="text"
            name="from_name"
            placeholder="YOUR NAME "
            required
          />
        </div>
        <div className="form-control">
          <input
            type="email"
            name="reply_to"
            placeholder="YOUR EMAIL"
            required
          />
        </div>
        <div className="form-control">
          <textarea name="message" rows="10" placeholder="MESSAGE" required />
        </div>
        <div className="form-control">
          <input
            type="submit"
            value={loading || "Say Hello"}
            style={style.button}
            ref={btn}
          />
        </div>
      </form>
      <div style={{ marginTop: "80px" }}>
        <h5>Designed & created by Odiba Mark</h5>
      </div>
    </section>
  );
};

export default Contact;
