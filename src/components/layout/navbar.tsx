"use client";
import { useState } from "react";
import { Search, Menu, Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/profile?tag=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <header className="h-16 flex items-center gap-4 px-4 lg:px-6 border-b border-white/6 bg-[rgba(11,11,16,0.95)] backdrop-blur-md sticky top-0 z-30">
      <button onClick={onMenuClick} className="lg:hidden text-white/50 hover:text-white/90 transition-colors p-1">
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className={cn(
          "relative flex items-center rounded-xl border transition-all duration-200",
          focused
            ? "border-[rgba(124,77,255,0.5)] bg-[rgba(124,77,255,0.05)] shadow-[0_0_0_3px_rgba(124,77,255,0.12)]"
            : "border-white/8 bg-white/4 hover:border-white/15"
        )}>
          <Search className="absolute left-3 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search player tag... (#2PQCRQ9LG)"
            className="w-full bg-transparent pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/25 outline-none font-body"
          />
          {query && (
            <button type="submit" className="absolute right-2 flex items-center gap-1 text-xs text-[#7C4DFF] hover:text-[#BF40FF] transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
              Search <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </form>

      <div className="ml-auto flex items-center gap-2">
        {/* Notif bell */}
        <button className="relative p-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFD700] shadow-[0_0_6px_rgba(255,215,0,0.7)]" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-white/8">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#BF40FF] flex items-center justify-center text-xs font-display font-bold shadow-[0_0_12px_rgba(124,77,255,0.4)]">
            RR
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white/90 leading-tight">RoyalRaider</div>
            <div className="text-[10px] text-white/40 leading-tight">#2PQCRQ9LG</div>
          </div>
        </div>
      </div>
    </header>
  );
}
