"use client";
import { useState } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { TableOfContents, MobileTableOfContents } from "./TableOfContents";
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
          <div className="docs-mobile-menu absolute left-0 top-[--topbar-h] bottom-0 w-72 max-w-[85vw] bg-[--bg] border-r border-[--border] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <Sidebar mobile onClose={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex pt-[--topbar-h]">
        {/* Desktop left sidebar */}
        <div className="hidden lg:flex flex-col fixed left-0 top-[--topbar-h] bottom-0 w-[--sidebar-w] border-r border-[--border] bg-[--bg-subtle]">
          <Sidebar />
        </div>

        {/* Center content + Right TOC container */}
        <div className="flex-1 lg:ml-[--sidebar-w] min-w-0 flex justify-center">
          <main className="w-full max-w-[780px] min-w-0 px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
            <MobileTableOfContents />
            <div className="mdx-content">
              {children}
            </div>
          </main>

          {/* Desktop right table of contents sidebar */}
          <aside
            aria-label="On this page"
            className="sticky top-[--topbar-h] hidden h-[calc(100vh-var(--topbar-h))] w-64 shrink-0 overflow-y-auto p-6 xl:block"
          >
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  );
}
