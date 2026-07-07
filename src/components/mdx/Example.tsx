"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import clsx from "clsx";

function CopyBtn({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(getText()); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1 text-xs text-[--text-muted] hover:text-[--text] transition-colors">
      {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
    </button>
  );
}

function ExampleBlock({ label, labelColor, children }: { label: string; labelColor: string; children: React.ReactNode }) {
  return (
    <div className="my-5 not-prose rounded-xl border border-[--border] overflow-hidden">
      <div className={clsx("flex items-center justify-between px-4 py-2 border-b border-[--border]", labelColor)}>
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="[&_[data-rehype-pretty-code-figure]]:!border-0 [&_[data-rehype-pretty-code-figure]]:!rounded-none [&_[data-rehype-pretty-code-figure]]:!my-0">
        {children}
      </div>
    </div>
  );
}

export function RequestExample({ children }: { children: React.ReactNode }) {
  return <ExampleBlock label="Request" labelColor="bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300" children={children} />;
}

export function ResponseExample({ children }: { children: React.ReactNode }) {
  return <ExampleBlock label="Response" labelColor="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300" children={children} />;
}
