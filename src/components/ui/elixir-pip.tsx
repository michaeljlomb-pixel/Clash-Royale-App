import { cn } from "@/lib/utils";

interface ElixirPipProps {
  cost: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ElixirPip({ cost, size = "md", className }: ElixirPipProps) {
  const sizes = { sm: "w-5 h-5 text-xs", md: "w-7 h-7 text-sm", lg: "w-9 h-9 text-base" };
  return (
    <div className={cn(
      "rounded-full flex items-center justify-center font-display font-bold",
      "bg-gradient-to-br from-[#BF40FF] to-[#7C4DFF] shadow-[0_0_12px_rgba(191,64,255,0.5)]",
      "border border-[rgba(191,64,255,0.4)]",
      sizes[size],
      className
    )}>
      {cost}
    </div>
  );
}
