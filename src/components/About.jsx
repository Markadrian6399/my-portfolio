import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { container, fadeInUp, viewport } from "../lib/motion";

const facts = [
  { label: "Experience", detail: "Web, mobile & desktop apps", value: "5 years" },
  { label: "Currently", detail: "Software Dev Tutor", value: "Khemsafe" },
  { label: "Focus", detail: "Front-end to back-end", value: "React, Node & Rust" },
  { label: "Availability", detail: "Freelance & contract work", value: "Open" },
];

const About = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={container}
    >
      <motion.div variants={fadeInUp}>
        <SectionLabel icon={UserRound}>About</SectionLabel>
      </motion.div>
      <motion.h2
        variants={fadeInUp}
        className="mt-8 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground/80 md:text-4xl"
      >
        Turning ideas into working software, with clarity, care and clean code
      </motion.h2>
      <motion.p variants={fadeInUp} className="mt-8 leading-relaxed text-mutedForeground">
        I'm a freelance software developer with five years spent across the
        web, mobile, and everything that connects them. I design and build
        interfaces with HTML, CSS, JavaScript and React, write server-side logic
        with Node.js, Express and MongoDB, and I'm growing into systems
        programming with Rust.
      </motion.p>

      <motion.div variants={fadeInUp} className="mt-12">
        {facts.map(({ label, detail, value }) => (
          <div
            key={label}
            className="flex items-start justify-between gap-6 border-t border-border py-7 last:border-b"
          >
            <div>
              <h3 className="font-heading text-xl">{label}</h3>
              <p className="mt-1 text-mutedForeground">{detail}</p>
            </div>
            <p className="text-right font-heading text-xl text-foreground/80">{value}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;
