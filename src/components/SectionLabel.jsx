const SectionLabel = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground/80">
    <Icon size={14} strokeWidth={1.75} className="text-accent" />
    {children}
  </span>
);

export default SectionLabel;
