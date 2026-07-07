"use client";
import { useState } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import clsx from "clsx";

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[--bg]">
      <TopNav onMenuToggle={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />

      {/* Mobile sidebar overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="absolute left-0 top-[--topbar-h] bottom-0 w-72 bg-[--bg] border-r border-[--border] overflow-y-auto">
            <Sidebar mobile onClose={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex pt-[--topbar-h]">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex flex-col fixed left-0 top-[--topbar-h] bottom-0 w-[--sidebar-w] border-r border-[--border] bg-[--bg-subtle]">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 lg:ml-[--sidebar-w] min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-10 xl:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
