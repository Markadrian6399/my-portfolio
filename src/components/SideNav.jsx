import { useEffect, useState } from "react";
import {
  ArrowUp,
  Briefcase,
  Cpu,
  House,
  Layers,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

const navLinks = [
  { id: "home", label: "Home", icon: House },
  { id: "about", label: "About", icon: UserRound },
  { id: "work", label: "Experience", icon: Briefcase },
  { id: "portfolio", label: "Projects", icon: Sparkles },
  { id: "services", label: "Services", icon: Layers },
  { id: "skills", label: "Tech Stack", icon: Cpu },
  { id: "contact", label: "Contact", icon: Send },
];

const SideNav = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 lg:bottom-auto lg:left-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:flex-col">
      <ul className="flex items-center gap-1 rounded-full border border-border bg-card/90 p-1.5 backdrop-blur lg:flex-col">
        {navLinks.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              title={label}
              aria-label={label}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-150 ${
                active === id
                  ? "bg-white/5 text-accent"
                  : "text-mutedForeground hover:text-foreground"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#home"
        title="Back to top"
        aria-label="Back to top"
        className="hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-card/90 text-mutedForeground backdrop-blur transition-colors duration-150 hover:text-accent lg:flex"
      >
        <ArrowUp size={16} strokeWidth={1.75} />
      </a>
    </nav>
  );
};

export default SideNav;
