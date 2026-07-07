"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[--border] rounded-lg overflow-hidden my-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[--text] hover:bg-[--bg-subtle] transition-colors text-left"
      >
        {title}
        <ChevronDown size={15} className={clsx("text-[--text-muted] transition-transform duration-200 shrink-0", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-[--text-muted] border-t border-[--border] bg-[--bg-subtle]
          [&>p]:mt-2 [&>p]:leading-relaxed [&>pre]:mt-3">
          {children}
        </div>
      )}
    </div>
  );
}

export function AccordionGroup({ children }: { children: React.ReactNode }) {
  return <div className="my-5 space-y-2 not-prose">{children}</div>;
}
