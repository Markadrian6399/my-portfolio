import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import SectionLabel from "./SectionLabel";
import html from "../images/html.png";
import css from "../images/css.png";
import tailwind from "../images/tailwind.png";
import javascript from "../images/javascript.png";
import react from "../images/react.png";
import mern from "../images/mern.svg";
import rust from "../images/rust.svg";
import { EASE, container, fadeInUp, viewport } from "../lib/motion";
import { useApi } from "../lib/api";

const icons = { html, css, tailwind, javascript, react, mern, rust };

const skills = [
  { name: "HTML", detail: "Markup & semantics", icon: "html", percent: 90 },
  { name: "CSS", detail: "Styling & layout", icon: "css", percent: 90 },
  { name: "Tailwind", detail: "Utility-first CSS", icon: "tailwind", percent: 90 },
  { name: "JavaScript", detail: "Language of the web", icon: "javascript", percent: 85 },
  { name: "React JS", detail: "Component-based UI", icon: "react", percent: 90 },
  { name: "MERN", detail: "MongoDB, Express, React, Node", icon: "mern", percent: 85 },
  { name: "Rust", detail: "Systems programming", icon: "rust", percent: 70 },
];

const Skills = () => {
  const items = useApi("/api/skills", skills);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={container}
    >
      <motion.div variants={fadeInUp}>
        <SectionLabel icon={Cpu}>Tech Stack</SectionLabel>
      </motion.div>
      <motion.h2
        variants={fadeInUp}
        className="mt-8 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground/80 md:text-4xl"
      >
        The tools I use to bring ideas to life
      </motion.h2>

      <div className="mt-12">
        {items.map(({ name, detail, icon, percent }) => (
          <motion.div
            key={name}
            variants={fadeInUp}
            className="flex flex-col gap-4 border-b border-border py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                {icons[icon] ? (
                  <img src={icons[icon]} alt="" className="h-7 w-7 object-contain" />
                ) : (
                  <span className="font-heading text-lg text-accent">{name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-mutedForeground">{detail}</p>
              </div>
            </div>
            <div className="relative h-11 w-full rounded-full border border-border bg-card sm:w-[45%]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `calc(${percent}% - 8px)` }}
                viewport={viewport}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-y-1 left-1 min-w-[64px] rounded-full bg-gradient-to-r from-accent/5 to-accent/25"
              >
                <span className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-background px-2.5 py-1 text-xs text-foreground/80">
                  {percent}%
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
