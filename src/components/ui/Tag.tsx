interface TagProps {
  label: string;
  variant?: "default" | "accent";
}

export default function Tag({ label, variant = "default" }: TagProps) {
  const styles = {
    default: "bg-[#1a1a1a] text-slate-400 border-[#222]",
    accent: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-mono rounded border ${styles[variant]}`}
    >
      {label}
    </span>
  );
}
