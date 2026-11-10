"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Brand SVG icons for chat providers
function OpenAIIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
    </svg>
  );
}

function AnthropicIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.827 3.518h3.818L24 20.482h-3.818l-1.92-4.524H10.54l-1.92 4.524H4.802L13.827 3.518zm2.74 9.47l-2.316-5.46-2.316 5.46h4.632zM0 20.482L9.025 3.518h3.818L3.818 20.482H0z" />
    </svg>
  );
}

function CursorIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2L2 19.5L12 16.5L22 19.5L12 2Z" />
    </svg>
  );
}

function V0Icon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4 8h3v8H4V8zm13 0h3v8h-3V8zm-6.5 0h3v8h-3V8z" />
    </svg>
  );
}

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract headings from page content
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = Array.from(
        document.querySelectorAll(".mdx-content h2, .mdx-content h3")
      );
      const items: TocItem[] = elements
        .filter((el) => {
          const text = (el.textContent || "").trim();
          return text.length > 0 && !el.closest(".not-prose");
        })
        .map((el) => ({
          id: el.id,
          text: (el.textContent || "").replace(/^#+\s*/, "").trim(),
          level: el.tagName === "H2" ? 2 : 3,
        }));

      setHeadings(items);
      if (items.length > 0) {
        setActiveId(items[0].id);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Scroll spy to highlight active heading
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -65% 0%",
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setChatDropdownOpen(false);
      }
    };
    if (chatDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [chatDropdownOpen]);

  // Action: Scroll to Top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Action: Copy as Markdown
  const handleCopyMarkdown = async () => {
    try {
      const contentEl = document.querySelector(".mdx-content");
      if (!contentEl) return;
      const text = contentEl.textContent || "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Get current full page URL
  const getPageUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://docs.chatty.personaliai.com${pathname}`;
  };

  const pageUrl = getPageUrl();

  const chatLinks = [
    {
      name: "Open in v0",
      icon: V0Icon,
      href: `https://v0.dev/chat?q=${encodeURIComponent(`Review documentation at ${pageUrl}`)}`,
    },
    {
      name: "Open in ChatGPT",
      icon: OpenAIIcon,
      href: `https://chatgpt.com/?q=${encodeURIComponent(`Web search Read ${pageUrl} so I can ask you questions about this page.`)}`,
    },
    {
      name: "Open in Claude",
      icon: AnthropicIcon,
      href: `https://claude.ai/new?q=${encodeURIComponent(`Please read and analyze ${pageUrl} so I can ask you questions about this documentation.`)}`,
    },
    {
      name: "Open in T3 Chat",
      icon: MessageSquare,
      href: `https://t3.chat/new?q=${encodeURIComponent(`Read ${pageUrl}`)}`,
    },
    {
      name: "Open in Scira",
      icon: Sparkles,
      href: `https://scira.ai/?q=${encodeURIComponent(`Read ${pageUrl}`)}`,
    },
    {
      name: "Open in Cursor",
      icon: CursorIcon,
      href: `cursor://anysphere.cursor?url=${encodeURIComponent(pageUrl)}`,
    },
  ];

  if (headings.length === 0) return null;

  return (
    <div className="flex flex-col text-sm">
      <div className="font-semibold text-xs tracking-wider uppercase text-[--text] mb-3 px-1">
        On this page
      </div>

      {/* Headings List */}
      <nav className="space-y-1 mb-6 max-h-[calc(100vh-320px)] overflow-y-auto pr-2 scrollbar-thin">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(h.id);
                if (target) {
                  const top = target.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                  history.pushState(null, "", `#${h.id}`);
                }
              }}
              className={clsx(
                "block py-1 leading-snug rounded transition-colors text-left",
                h.level === 3 ? "pl-3 text-[12.5px]" : "text-[13px]",
                isActive
                  ? "text-brand-600 dark:text-brand-400 font-medium"
                  : "text-[--text-muted] hover:text-[--text]"
              )}
            >
              {h.text}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-[--border] pt-4 space-y-2 text-xs" ref={dropdownRef}>
        {/* Scroll to top */}
        <button
          type="button"
          onClick={handleScrollToTop}
          className="flex items-center gap-2 text-[--text-muted] hover:text-[--text] py-1 px-1 transition-colors w-full text-left"
        >
          <ArrowUp size={13} className="shrink-0" />
          <span>Scroll to top</span>
        </button>

        {/* Copy as Markdown */}
        <button
          type="button"
          onClick={handleCopyMarkdown}
          className="flex items-center gap-2 text-[--text-muted] hover:text-[--text] py-1 px-1 transition-colors w-full text-left"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-500 shrink-0" />
              <span className="text-emerald-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} className="shrink-0" />
              <span>Copy as Markdown</span>
            </>
          )}
        </button>

        {/* Open in chat Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setChatDropdownOpen((v) => !v)}
            className="flex items-center justify-between gap-2 text-[--text-muted] hover:text-[--text] py-1 px-1 transition-colors w-full text-left"
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={13} className="shrink-0" />
              <span>Open in chat</span>
            </div>
            {chatDropdownOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>

          {/* Floating Dropdown Popover */}
          {chatDropdownOpen && (
            <div className="absolute right-0 bottom-full mb-1.5 w-48 bg-[--bg] border border-[--border] rounded-xl shadow-xl p-1.5 z-50 text-xs">
              {chatLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setChatDropdownOpen(false)}
                    className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-[--text-muted] hover:text-[--text] hover:bg-[--bg-muted] transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <ExternalLink size={11} className="text-[--text-subtle] shrink-0" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MobileTableOfContents() {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = Array.from(
        document.querySelectorAll(".mdx-content h2, .mdx-content h3")
      );
      const items: TocItem[] = elements
        .filter((el) => {
          const text = (el.textContent || "").trim();
          return text.length > 0 && !el.closest(".not-prose");
        })
        .map((el) => ({
          id: el.id,
          text: (el.textContent || "").replace(/^#+\s*/, "").trim(),
          level: el.tagName === "H2" ? 2 : 3,
        }));
      setHeadings(items);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <div className="xl:hidden mb-6 border border-[--border] rounded-xl bg-[--bg-subtle] overflow-hidden not-prose">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[--text] hover:bg-[--bg-muted] transition-colors"
      >
        <span>On this page</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isOpen && (
        <div className="px-4 pb-3 pt-1 border-t border-[--border] space-y-1 max-h-60 overflow-y-auto">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const target = document.getElementById(h.id);
                if (target) {
                  const top = target.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                  history.pushState(null, "", `#${h.id}`);
                }
              }}
              className={clsx(
                "block py-1 text-xs leading-snug transition-colors",
                h.level === 3 ? "pl-3 text-[--text-subtle]" : "text-[--text-muted]",
                "hover:text-[--text]"
              )}
            >
              {h.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
