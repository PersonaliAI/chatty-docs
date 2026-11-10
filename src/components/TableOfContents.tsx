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
} from "lucide-react";
import clsx from "clsx";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ChatProvider {
  name: string;
  iconSrc: string;
  href: string;
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

  const chatLinks: ChatProvider[] = [
    {
      name: "Open in v0",
      iconSrc: "/agents/v0.svg",
      href: `https://v0.dev/chat?q=${encodeURIComponent(`Review documentation at ${pageUrl}`)}`,
    },
    {
      name: "Open in ChatGPT",
      iconSrc: "/agents/chatgpt.png",
      href: `https://chatgpt.com/?q=${encodeURIComponent(`Web search Read ${pageUrl} so I can ask you questions about this page.`)}`,
    },
    {
      name: "Open in Claude",
      iconSrc: "/agents/claude.png",
      href: `https://claude.ai/new?q=${encodeURIComponent(`Please read and analyze ${pageUrl} so I can ask you questions about this documentation.`)}`,
    },
    {
      name: "Open in Grok",
      iconSrc: "/agents/grok.png",
      href: `https://x.com/i/grok?text=${encodeURIComponent(`Read documentation at ${pageUrl} so I can ask you questions about this page.`)}`,
    },
    {
      name: "Open in Cursor",
      iconSrc: "/agents/cursor.png",
      href: `cursor://anysphere.cursor?url=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: "Open in Scira",
      iconSrc: "/agents/scira.png",
      href: `https://scira.ai/?q=${encodeURIComponent(`Read ${pageUrl}`)}`,
    },
    {
      name: "Open in T3 Chat",
      iconSrc: "/agents/t3.png",
      href: `https://t3.chat/new?q=${encodeURIComponent(`Read ${pageUrl}`)}`,
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
            <div className="absolute right-0 bottom-full mb-1.5 w-52 bg-[--bg] border border-[--border] rounded-xl shadow-2xl p-1.5 z-50 text-xs">
              {chatLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setChatDropdownOpen(false)}
                  className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-[--text-muted] hover:text-[--text] hover:bg-[--bg-muted] transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="w-4 h-4 rounded-sm object-contain shrink-0"
                    />
                    <span className="truncate font-medium">{item.name}</span>
                  </div>
                  <ExternalLink size={11} className="text-[--text-subtle] shrink-0" />
                </a>
              ))}
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
