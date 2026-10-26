import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import mk from "../images/mk.png";
import html from "../images/html.png";
import css from "../images/css.png";
import react from "../images/react.png";
import node from "../images/node.jpg";
import mongo from "../images/mongo.png";
import tailwind from "../images/tailwind.png";
import javascript from "../images/javascript.png";
import rust from "../images/rust.svg";
import { container, fadeInUp, viewport } from "../lib/motion";

const stack = [
  { src: html, alt: "HTML" },
  { src: css, alt: "CSS" },
  { src: javascript, alt: "JavaScript" },
  { src: react, alt: "React" },
  { src: node, alt: "Node.js" },
  { src: mongo, alt: "MongoDB" },
  { src: tailwind, alt: "Tailwind" },
  { src: rust, alt: "Rust" },
];

const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "3", label: "Companies worked with" },
];

const useClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  return now;
};

const Ribbon = () => (
  <div className="relative mx-auto -mt-4 aspect-[2/1] w-full max-w-[680px]" aria-hidden="true">
    <svg viewBox="0 0 680 340" className="absolute inset-0 h-full w-full" fill="none">
      <defs>
        <linearGradient id="ribbon" x1="0" y1="0" x2="680" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00DE51" stopOpacity="0" />
          <stop offset="0.35" stopColor="#00A83D" />
          <stop offset="0.7" stopColor="#00DE51" />
          <stop offset="1" stopColor="#00DE51" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M10 190 C 120 250, 230 170, 330 120 C 430 70, 520 110, 500 200 C 480 290, 360 300, 380 220 C 400 140, 540 110, 670 130"
        stroke="url(#ribbon)"
        strokeWidth="38"
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute left-[54%] top-[8%] h-28 w-28 sm:h-36 sm:w-36">
      <div className="absolute inset-0 rounded-full border border-white/10 bg-background/80 backdrop-blur" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
        </defs>
        <text className="fill-foreground/80 text-[9px] uppercase tracking-[0.2em]">
          <textPath href="#badge-circle">Full-stack · Rust · React · Node ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-heading text-lg font-semibold text-accent">
        MO
      </span>
    </div>
  </div>
);

const Home = () => {
  const now = useClock();

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={container}
      className="pt-6 lg:pt-14"
    >
      <motion.div variants={fadeInUp} className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={mk}
            alt=""
            className="h-12 w-12 rounded-full border border-border object-cover object-top grayscale"
          />
          <div>
            <p className="font-medium">Mark Odiba</p>
            <p className="text-sm text-mutedForeground">Full-Stack & Rust Developer</p>
          </div>
        </div>
        <p className="hidden text-right text-sm text-mutedForeground sm:block">
          {now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
          <br />
          {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
        </p>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="mt-14 font-heading text-4xl font-medium leading-[1.15] tracking-tight text-foreground/80 sm:text-5xl xl:text-6xl"
      >
        I'm building{" "}
        <span className="rounded-full bg-[#0B8F3A] px-3 text-foreground [box-decoration-break:clone]">
          web apps
        </span>{" "}
        <span className="rounded-full bg-white/5 px-3 text-accent [box-decoration-break:clone]">
          & systems
        </span>{" "}
        that people rely on
      </motion.h1>

      <motion.div variants={fadeInUp}>
        <Ribbon />
      </motion.div>

      <motion.div variants={fadeInUp} className="-mt-6 flex gap-12 sm:-mt-16">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <p className="font-serif text-6xl leading-none">{value}</p>
            <p className="mt-3 text-sm text-mutedForeground">{label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-20">
        <p className="text-sm text-mutedForeground">Tools I build with</p>
        <div className="mask-fade-x mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-14">
            {[...stack, ...stack].map(({ src, alt }, i) => (
              <div key={i} className="flex items-center gap-3 opacity-60 grayscale">
                <img src={src} alt={alt} className="h-7 w-7 object-contain" />
                <span className="font-heading text-lg">{alt}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
