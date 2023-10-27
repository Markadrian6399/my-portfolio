import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Sides = () => {
  const theme = useSelector((state) => state.theme.value);
  const sides = {
    flex: {
      display: "flex",
      justifyContent: "space-between",
      position: "fixed",
      width: "100vw",
      padding: "0 30px 0 10px",
      top: "50%",
      transform: "translate(0, -50%)",
      // zIndex: '998'
    },
    icons: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      gap: "15px",
      color: theme === "light" ? "#2c2b2b" : "white",
      fontSize: "18px",
      overflow: "hidden",
    },
    dots: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    dot: {
      height: "8px",
      width: "8px",
      border: "1px solid",
      borderColor: theme === "light" ? "black" : "white",
      borderRadius: "50%",
    },
  };
  let sections = document.querySelectorAll(".section");
  window.onscroll = () => {
    sections.forEach((section) => {
      let top = window.scrollY;
      let height = section.offsetHeight;
      let offset = section.offsetTop - 50;
      let id = section.getAttribute("id");

      if (top > offset && top < offset + height) {
        document
          .querySelector(`.dots a[href= "#${id}"] .dot`)
          .classList.add("active");
        document
          .querySelector(`header a[href= "#${id}"]`)
          .classList.add("activeNav");
      } else {
        document
          .querySelector(`.dots a[href= "#${id}"] .dot`)
          .classList.remove("active");
        document
          .querySelector(`header a[href= "#${id}"]`)
          .classList.remove("activeNav");
      }
    });
  };

  return (
    <div style={sides.flex}>
      <div style={sides.icons}>
        <a
          href="https://github.com/Markadrian6399"
          target={"_blank"}
          rel="noreferrer"
        >
          <FaGithub className="socials" />
        </a>
        <a
          href="https://www.linkedin.com/in/mark-odiba-59a496283"
          target={"_blank"}
          rel="noreferrer"
        >
          <FaLinkedinIn className="socials" />
        </a>

        <a
          href="https://www.facebook.com/profile.php?id=100013071878331"
          target={"_blank"}
          rel="noreferrer"
        >
          <FaFacebook className="socials" />
        </a>
        <a
          href="https://instagram.com/iam_odimark?igshid=MzMyNGUyNmU2YQ=="
          target={"_blank"}
          rel="noreferrer"
        >
          <FaInstagram className="socials" />
        </a>
        <a
          href="https://twitter.com/odiba_adrian?t=5ua3JuXu0FZ4ZTJZHUpnfw&s=09"
          target={"_blank"}
          rel="noreferrer"
        >
          <FaTwitter className="socials" />
        </a>
      </div>
      <div className="dots" style={sides.dots}>
        <a href="#home">
          <div style={sides.dot} className="dot"></div>
        </a>
        <a href="#about">
          <div style={sides.dot} className="dot"></div>
        </a>
        <a href="#skills">
          <div style={sides.dot} className="dot"></div>
        </a>
        <a href="#portfolio">
          <div style={sides.dot} className="dot"></div>
        </a>
        <a href="#work">
          <div style={sides.dot} className="dot"></div>
        </a>
        <a href="#contact">
          <div style={sides.dot} className="dot"></div>
        </a>
      </div>
    </div>
  );
};

export default Sides;
