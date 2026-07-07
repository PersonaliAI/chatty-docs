"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, Moon, Sun, Menu, X, ExternalLink } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { usePathname } from "next/navigation";

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-[--bg-muted] text-[--text-muted] hover:text-[--text] transition-colors" aria-label="Toggle theme">
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const all = navigation.flatMap((g) => g.items);
  const results = query.trim()
    ? all.filter((i) => i.title.toLowerCase().includes(query.toLowerCase()))
    : all.slice(0, 8);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-xl bg-[--bg] rounded-xl border border-[--border] shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[--border]">
          <Search size={16} className="text-[--text-muted] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-[--text] placeholder:text-[--text-subtle] outline-none text-sm"
          />
          <kbd className="text-[10px] text-[--text-subtle] border border-[--border] rounded px-1.5 py-0.5">ESC</kbd>
        </div>
        <div className="py-2 max-h-80 overflow-y-auto">
          {results.length === 0 && <p className="text-sm text-[--text-muted] px-4 py-6 text-center">No results for "{query}"</p>}
          {results.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-[--bg-subtle] text-sm text-[--text-muted] hover:text-[--text] transition-colors">
              <Search size={13} className="text-[--text-subtle] shrink-0" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TopNav({ onMenuToggle, menuOpen }: { onMenuToggle: () => void; menuOpen: boolean }) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-[--topbar-h] bg-[--bg]/90 backdrop-blur border-b border-[--border] flex items-center px-4 gap-4">
        {/* Logo */}
        <Link href="/introduction" className="flex items-center gap-2.5 shrink-0 mr-2">
          <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-sm">C</div>
          <span className="font-semibold text-sm text-[--text]">Chatty</span>
          <span className="text-xs text-[--text-subtle] bg-[--bg-muted] rounded px-1.5 py-0.5 font-mono">docs</span>
        </Link>

        {/* Search */}
        <button onClick={() => setSearchOpen(true)}
          className="flex-1 max-w-xs flex items-center gap-2 px-3 py-1.5 text-sm text-[--text-muted] bg-[--bg-subtle] border border-[--border] rounded-lg hover:border-brand-500/50 transition-colors">
          <Search size={13} />
          <span className="flex-1 text-left text-[--text-subtle]">Search docs...</span>
          <kbd className="text-[10px] border border-[--border] rounded px-1 py-0.5 hidden sm:block">âŒ˜K</kbd>
        </button>

        <div className="flex-1" />

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm text-[--text-muted]">
          <a href="https://chatty.personaliai.com/dashboard" target="_blank" rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-[--bg-muted] hover:text-[--text] transition-colors">
            Dashboard <ExternalLink size={11} />
          </a>
          <a href="/changelog" className="px-3 py-1.5 rounded-lg hover:bg-[--bg-muted] hover:text-[--text] transition-colors">Changelog</a>
        </nav>

        <ThemeToggle />

        <a href="https://chatty.personaliai.com/signup" target="_blank" rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors">
          Get started
        </a>

        {/* Mobile menu toggle */}
        <button className="lg:hidden p-2 rounded-lg hover:bg-[--bg-muted] text-[--text-muted]" onClick={onMenuToggle}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
