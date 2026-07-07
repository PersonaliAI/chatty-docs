"use client";
import { useState, Children, isValidElement } from "react";
import { Copy, Check } from "lucide-react";
import clsx from "clsx";

function getLabel(child: React.ReactElement<Record<string, unknown>>): string {
  const props = child.props as Record<string, unknown>;
  const childProps = (props?.children as React.ReactElement<Record<string, unknown>>)?.props ?? {};
  const title = (props?.["data-language"] as string) || (childProps?.["data-language"] as string) || "";
  return title;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors" title="Copy">
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export function CodeGroup({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement);
  const [active, setActive] = useState(0);

  // Extract tab titles from figure/pre title attrs
  const tabs = items.map((child, i) => {
    const el = child as React.ReactElement<any>;
    // Try to get a data-rehype-pretty-code-title sibling or data-language
    const title = el.props?.title || el.props?.["data-rehype-pretty-code-title"] || `Tab ${i + 1}`;
    return title;
  });

  const activeEl = items[active] as React.ReactElement<any>;
  const codeText = activeEl?.props?.children?.props?.children?.toString?.() ?? "";

  return (
    <div className="my-5 not-prose rounded-xl border border-[--border] overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center bg-[--bg-muted] border-b border-[--border] overflow-x-auto">
        {tabs.map((tab, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={clsx(
              "px-4 py-2.5 text-xs font-mono whitespace-nowrap transition-colors border-b-2",
              i === active
                ? "border-brand-500 text-[--text]"
                : "border-transparent text-[--text-muted] hover:text-[--text]"
            )}>
            {tab}
          </button>
        ))}
        <div className="flex-1" />
        <CopyButton text={codeText} />
        <span className="pr-2" />
      </div>

      {/* Active code block */}
      <div className="[&_[data-rehype-pretty-code-figure]]:!border-0 [&_[data-rehype-pretty-code-figure]]:!rounded-none [&_[data-rehype-pretty-code-figure]]:!my-0">
        {items[active]}
      </div>
    </div>
  );
}
