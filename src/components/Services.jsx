import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Layers, Minus, Plus } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { EASE, container, fadeInUp, viewport } from "../lib/motion";

const services = [
  {
    title: "Web Development",
    description:
      "Designing web pages and making sure they work, using HTML, CSS, JavaScript, React and more. Responsive, fast and easy to use.",
  },
  {
    title: "Full-Stack Apps",
    description:
      "Designing databases with MongoDB, building server-side logic with Node.js and Express, and connecting the front-end to the back-end through APIs.",
  },
  {
    title: "Interactive Front-ends",
    description:
      "Writing JavaScript that makes pages interactive, and building complex single-page applications with React.",
  },
  {
    title: "Systems with Rust",
    description:
      "Memory-safe, high-performance code, with a growing focus on fast, reliable backend tools.",
  },
];

const Services = () => {
  const [open, setOpen] = useState(0);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={container}
    >
      <motion.div variants={fadeInUp}>
        <SectionLabel icon={Layers}>Services</SectionLabel>
      </motion.div>

      <div className="mt-8">
        {services.map(({ title, description }, index) => {
          const isOpen = open === index;
          return (
            <motion.div key={title} variants={fadeInUp} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-8 text-left"
              >
                <span
                  className={`font-heading text-3xl font-medium tracking-tight transition-colors duration-150 md:text-4xl ${
                    isOpen ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {title}
                </span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${
                    isOpen ? "border-accent text-accent" : "border-border text-mutedForeground"
                  }`}
                >
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-6 leading-relaxed text-mutedForeground">
                      {description}
                    </p>
                    <a
                      href="#contact"
                      className="mb-8 inline-flex items-center gap-2 text-sm text-accent transition-opacity duration-150 hover:opacity-80"
                    >
                      Start a project <ArrowRight size={14} />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Services;
