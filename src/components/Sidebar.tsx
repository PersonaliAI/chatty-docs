"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";

export function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={clsx(
      "flex flex-col h-full overflow-y-auto py-7",
      mobile ? "px-4" : "px-6"
    )}>
      {navigation.map((group) => (
        <div key={group.title} className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[--text-subtle] mb-3 px-3">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] transition-colors",
                      active
                        ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium"
                        : "text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text]"
                    )}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    )}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Bottom links */}
      <div className="mt-auto pt-5 border-t border-[--border] space-y-0.5">
        {mobile && (
          <a href="https://chatty.personaliai.com/signup" target="_blank" rel="noreferrer"
            className="flex sm:hidden items-center justify-center gap-1.5 mb-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
            Get started
          </a>
        )}
        <a href="https://chatty.personaliai.com/dashboard" target="_blank" rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-[13.5px] text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text] transition-colors">
          <span>Dashboard</span>
          <ExternalLink size={12} className="text-[--text-subtle]" />
        </a>
        <a href="https://chatty.personaliai.com" target="_blank" rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-[13.5px] text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text] transition-colors">
          <span>chatty.personaliai.com</span>
          <ExternalLink size={12} className="text-[--text-subtle]" />
        </a>
        <a href="https://api.chatty.personaliai.com/docs" target="_blank" rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-[13.5px] text-[--text-muted] hover:bg-[--bg-muted] hover:text-[--text] transition-colors">
          <span>Swagger UI</span>
          <ExternalLink size={12} className="text-[--text-subtle]" />
        </a>
      </div>
    </aside>
  );
}
