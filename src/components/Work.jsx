import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { container, fadeInUp, viewport } from "../lib/motion";
import { useApi } from "../lib/api";

const jobs = [
  {
    company: "Khemsafe",
    role: "Software Dev Tutor",
    period: "2021 — Present",
    description:
      "Teaching students across a variety of languages, platforms and frameworks such as JavaScript, React, Next.js, Express.js, MongoDB, MongoDB Atlas and Netlify.",
  },
  {
    company: "Space World Tech",
    role: "Computer Operator",
    period: "2021 — Present",
    description:
      "Responsible for the day-to-day operation of computer systems: monitoring systems, running batch jobs, troubleshooting and more.",
  },
  {
    company: "Jopa LTD",
    role: "Graphics Designer",
    period: "2017",
    description:
      "Collaborated with a team of designers on magazines, logos, and other graphic works.",
  },
];

const Work = () => {
  const items = useApi("/api/experience", jobs);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={container}
    >
      <motion.div variants={fadeInUp}>
        <SectionLabel icon={Briefcase}>Experience</SectionLabel>
      </motion.div>
      <motion.h2
        variants={fadeInUp}
        className="mt-8 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground/80 md:text-4xl"
      >
        Where I have worked
      </motion.h2>

      <div className="mt-14">
        {items.map(({ id, company, role, period, description }, index) => (
          <motion.div
            key={id ?? company}
            variants={fadeInUp}
            className="grid grid-cols-[88px_1fr] gap-4 sm:grid-cols-[140px_1fr] sm:gap-8"
          >
            <p className="pt-0.5 text-sm text-mutedForeground sm:text-base">{period}</p>
            <div
              className={`relative border-l border-border pl-8 ${
                index < items.length - 1 ? "pb-14" : ""
              }`}
            >
              <span className="absolute -left-[6px] top-1.5 h-[11px] w-[11px] rounded-full bg-accent shadow-[0_0_12px_#00DE51]" />
              <h3 className="text-lg font-medium">
                {role} at {company}
              </h3>
              <p className="mt-2 leading-relaxed text-mutedForeground">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Work;
