import { useEffect, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import mk from "../images/mk.png";
import cv from "../images/MARK CV.pdf";
import { roles, socials } from "../lib/data";
import { trackEvent } from "../lib/api";

const useTypedText = (words) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timer;
    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((index + 1) % words.length);
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 40 : 90
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
};

const ProfileCard = () => {
  const typed = useTypedText(roles);

  return (
    <div className="p-4 lg:p-0">
      <aside className="relative h-[620px] overflow-hidden rounded-[28px] border border-border bg-card lg:fixed lg:left-6 lg:top-1/2 lg:z-30 lg:h-[calc(100vh-48px)] lg:max-h-[860px] lg:w-[400px] lg:-translate-y-1/2 xl:left-10 xl:w-[440px]">
        <img
          src={mk}
          alt="Mark Odiba"
          className="absolute inset-0 h-full w-full object-cover object-top grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

        <div className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-background/60 font-heading text-sm font-semibold backdrop-blur">
          MO
        </div>

        <div className="absolute right-6 top-6 flex flex-col gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background/60 text-foreground/80 backdrop-blur transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-r-2xl border border-l-0 border-white/10 bg-background/70 px-2 py-4 text-sm text-foreground/70 backdrop-blur [writing-mode:vertical-rl] rotate-180">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for Work
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <h2 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
            Hey, I'm {typed}
            <span className="caret ml-0.5 inline-block h-[0.9em] w-0.5 translate-y-1 bg-foreground" />
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60">
            I'm Mark Odiba, a freelance software developer building web apps,
            mobile apps and the systems that hold them together.
          </p>

          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#contact"
                aria-label="Let's talk"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accentForeground transition-transform duration-150 hover:rotate-45"
              >
                <ArrowUpRight size={18} />
              </a>
              <a
                href="#contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accentForeground transition-opacity duration-150 hover:opacity-90"
              >
                Let's talk
              </a>
              <a
                href={cv}
                download="Mark Adakole Odiba CV.pdf"
                onClick={() => trackEvent("cv_download")}
                className="ml-3 inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors duration-150 hover:text-accent"
              >
                <FileText size={16} strokeWidth={1.5} />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProfileCard;
