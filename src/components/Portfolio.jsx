import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionLabel from "./SectionLabel";
import { container, fadeInUp, viewport } from "../lib/motion";
import { trackEvent, useApi } from "../lib/api";

const projects = [
  {
    title: "Shoe Color Drop",
    tag: "HTML & JavaScript",
    liveUrl: "https://vercel.com/markadrian6399/shoe-drop",
    codeUrl: "https://github.com/Markadrian6399/shoe-drop",
  },
  {
    title: "Kimana",
    tag: "Web App",
    liveUrl: "https://kimana-frontend.vercel.app/",
  },
  {
    title: "LumaBet",
    tag: "Web3 · Stellar",
    liveUrl: "https://luma-bet-frontend.vercel.app/",
  },
  {
    title: "Music Player",
    tag: "JavaScript",
    codeUrl: "https://github.com/Markadrian6399/mix-musik",
  },
  {
    title: "Photo E-gallery",
    tag: "MERN",
    liveUrl: "https://vercel.com/markadrian6399/ecom-client",
    codeUrl: "https://github.com/Markadrian6399/Ecom",
  },
];

const glows = ["20% 30%", "80% 20%", "30% 80%", "75% 75%", "50% 10%"];

const ProjectCard = ({ index, title, tag, liveUrl, codeUrl }) => (
  <div className="group rounded-[28px] border border-border bg-card p-2 transition-colors duration-200 hover:border-accent/40">
    <div
      className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-[22px] border border-white/5 p-6 sm:p-8"
      style={{
        background: `radial-gradient(circle at ${glows[index % glows.length]}, rgba(0,222,81,0.22), transparent 55%), #0E0E11`,
      }}
    >
      <div className="flex items-start justify-between">
        <span className="font-serif text-2xl text-foreground/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-foreground/70">
          {tag}
        </span>
      </div>
      <h3 className="font-heading text-3xl font-medium tracking-tight transition-transform duration-500 ease-fast group-hover:translate-x-2 sm:text-5xl">
        {title}
      </h3>
    </div>
    <div className="flex items-center justify-end gap-5 px-4 py-3 text-sm">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("project_click", title)}
          className="inline-flex items-center gap-1.5 text-accent transition-opacity duration-150 hover:opacity-80"
        >
          Live <ArrowUpRight size={15} />
        </a>
      )}
      {codeUrl && (
        <a
          href={codeUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("project_click", title)}
          className="inline-flex items-center gap-1.5 text-mutedForeground transition-colors duration-150 hover:text-foreground"
        >
          <FaGithub size={14} /> Code
        </a>
      )}
    </div>
  </div>
);

const Portfolio = () => {
  const items = useApi("/api/projects", projects);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={container}
    >
      <motion.div variants={fadeInUp}>
        <SectionLabel icon={Sparkles}>Work Highlights</SectionLabel>
      </motion.div>
      <motion.h2
        variants={fadeInUp}
        className="mt-8 font-heading text-3xl font-medium leading-tight tracking-tight text-foreground/80 md:text-4xl"
      >
        Some of the things I have built
      </motion.h2>

      <div className="mt-14 flex flex-col gap-8">
        {items.map((project, index) => (
          <motion.div key={project.id ?? project.title} variants={fadeInUp}>
            <ProjectCard index={index} {...project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Portfolio;
