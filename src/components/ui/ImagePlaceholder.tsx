import { LuImage } from "react-icons/lu";

interface ImagePlaceholderProps {
  label: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImagePlaceholder({
  label,
  className = "",
  aspectRatio = "aspect-video",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${aspectRatio} bg-[#111] border border-dashed border-[#333] rounded-lg flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <LuImage className="text-slate-600" size={32} />
      <span className="text-slate-600 text-xs font-mono">{label}</span>
    </div>
  );
}
