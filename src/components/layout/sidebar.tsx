"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Layers, CreditCard, Trophy, User, X, Swords } from "lucide-react";

const NAV = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/decks", icon: Layers, label: "Decks" },
  { href: "/cards", icon: CreditCard, label: "Cards" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/profile", icon: User, label: "My Profile" },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full z-50 w-64 flex flex-col",
        "bg-[rgb(11,11,16)] border-r border-white/6",
        "transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FF8C00] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              <Swords className="w-4 h-4 text-black" />
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-white group-hover:text-[#FFD700] transition-colors">
              RoyalStats
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white/80 transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-thin">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 px-3 mb-3">Navigation</p>
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  active
                    ? "bg-gradient-to-r from-[rgba(124,77,255,0.25)] to-[rgba(124,77,255,0.08)] text-white border border-[rgba(124,77,255,0.3)]"
                    : "text-white/50 hover:text-white/90 hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4 flex-shrink-0 transition-colors", active ? "text-[#7C4DFF]" : "text-white/40 group-hover:text-white/70")} />
                {label}
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7C4DFF]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/6">
          <div className="rounded-xl bg-gradient-to-br from-[rgba(124,77,255,0.15)] to-[rgba(255,190,0,0.08)] border border-white/8 p-4">
            <div className="text-xs font-display font-bold text-white/90 mb-0.5">Season 57</div>
            <div className="text-[10px] text-white/40 mb-2">Ends in 12 days</div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#BF40FF]" />
            </div>
            <div className="text-[10px] text-white/40 mt-1.5">Season Pass • 62% complete</div>
          </div>
        </div>
      </aside>
    </>
  );
}
